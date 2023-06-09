"use client";
import React, { useContext, useEffect, useState } from "react";
import VerifyEmailHeader from "./VerifyEmailHeader";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import SendIcon from "@mui/icons-material/Send";
import {
  Box,
  Button,
  CircularProgress,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import InpEmail from "../Inputs/InpEmail";
import EmailTimer from "./EmailTimer";
import { VerifyEmailContext } from "@/contexts/VerifyEmailWrapper";
import * as emailValidation from "@/lib/validation/emailValidation";
import { fetchUpdateEmail } from "@/lib/fetch/post/updateEmailPost";
import { fetchSendVerifyEmailPost } from "@/lib/fetch/post/sendVerifyEmailPost";
import moment from "moment";

export default function VerifyEmail() {
  const { data: session, status, update } = useSession();
  const [emailEditable, setEmailEditable] = useState(false);
  const [loading, setLoading] = useState(false);

  const { expiration, setExpiration } = useContext(VerifyEmailContext);
  const formData = useForm<{ email: string }>();
  const { register, formState, setValue, setFocus, handleSubmit } = formData;
  const { errors } = formState;
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (emailEditable) {
      setFocus("email");
    }
  }, [emailEditable]);

  useEffect(() => {
    if (!session || !session.user) {
      return;
    }
    setValue("email", session.user.email.address);
  }, [session]);

  const editEmail = () => {
    setFocus("email");
    setEmailEditable(true);
  };

  const saveEmail = async (data: { email: string }) => {
    if (loading) {
      return;
    }
    setLoading(true);
    if (!setExpiration || !session) return;

    const { username } = session.user;
    const res = await fetchUpdateEmail(username, data.email);

    if (!res || res.error) {
      setErrorMessage("Internal Server Error. Please try again later.");
      console.log(res?.error.message);
      setLoading(false);
      return;
    }

    await update({
      email: { ...session.user.email, address: data.email },
    });

    setEmailEditable(false);
    setLoading(false);
    setErrorMessage("");
  };

  const cancel = () => {
    if (session) {
      setValue("email", session.user.email.address);
    }
    setEmailEditable(false);
  };

  const sendEmail = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    if (!setExpiration || !session) return;

    const res = await fetchSendVerifyEmailPost(session.user.username);

    if (!res) {
      setErrorMessage("Internal Server Error. Please try again later.");
      setLoading(false);
      return;
    }

    if (res.error) {
      setErrorMessage(res.error.message);
      setLoading(false);
      return;
    }

    const currentDate = new Date();
    const expired = new Date(currentDate.getTime() + 120000);
    localStorage.setItem("timerExpiration", expired.toISOString());
    setExpiration(expired);
    setLoading(false);
    setErrorMessage("");
  };

  const sendBtnDisabled = () => {
    if (loading) {
      return true;
    }
    const currentDate = moment();
    const _exp = localStorage.getItem("timerExpiration");
    const exp = _exp ? new Date(_exp) : expiration;

    if (exp) {
      return currentDate.isBefore(exp);
    }
    return false;
  };

  return (
    <Box
      component={Paper}
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <Stack
        spacing={2}
        component={Paper}
        elevation={8}
        square
        py={2}
        px={8}
        sx={{
          minHeight: "calc(100vh - 64px)",
          height: "100%",
          width: "100%",
          maxWidth: "600px",
          display: "flex",
          alignItems: "center",
        }}
        justifyContent={status === "loading" ? "center" : "start"}
      >
        {status === "loading" ? (
          <CircularProgress size={50} />
        ) : (
          <>
            <Box my={2}>
              <VerifyEmailHeader />
            </Box>

            <Typography variant="h5" color="error" textAlign="center">
              {errorMessage}
            </Typography>

            <Box my={2} width="100%">
              <InpEmail
                disable={!emailEditable}
                register={register("email", {
                  validate: emailValidation,
                })}
                //@ts-ignore
                error={errors.email}
              />

              <Stack
                component="form"
                direction="row"
                spacing={2}
                sx={{ justifyContent: "space-between" }}
                onSubmit={handleSubmit(saveEmail)}
              >
                {emailEditable ? (
                  <>
                    <Button
                      variant="contained"
                      color="error"
                      startIcon={<CancelIcon />}
                      onClick={cancel}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="contained"
                      disabled={loading}
                      startIcon={
                        loading ? (
                          <CircularProgress
                            sx={{ ml: "10px" }}
                            color="inherit"
                            size={20}
                          />
                        ) : (
                          <SaveIcon />
                        )
                      }
                      type="submit"
                    >
                      {loading ? "" : "Save"}
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      variant="contained"
                      color="secondary"
                      startIcon={<EditIcon />}
                      onClick={editEmail}
                    >
                      Edit
                    </Button>
                    <Button
                      id="sendCodeBtn"
                      variant="contained"
                      onClick={sendEmail}
                      disabled={sendBtnDisabled()}
                      startIcon={
                        loading ? (
                          <CircularProgress
                            sx={{ ml: "10px" }}
                            color="inherit"
                            size={20}
                          />
                        ) : (
                          <SendIcon />
                        )
                      }
                    >
                      {loading ? " " : "Send Code"}
                    </Button>
                  </>
                )}
              </Stack>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  my: 2,
                }}
              >
                <EmailTimer />
              </Box>
            </Box>
          </>
        )}
      </Stack>
    </Box>
  );
}
