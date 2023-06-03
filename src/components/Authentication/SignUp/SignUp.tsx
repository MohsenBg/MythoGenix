"use client";
import { FromLogin } from "@/interfaces/IFromLogin";
import { signInSubmit } from "@/lib/submit/signInSubmit";
import {
  Box,
  Button,
  CircularProgress,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import InpUsername from "../Inputs/InpUsername";
import InpEmail from "../Inputs/InpEmail";
import SignUpHeader from "./SignUpHeader";
import SignUpFooter from "./SignUpFooter";
import { useForm } from "react-hook-form";
import { FromSignUp } from "@/interfaces/IFromSignUp";
import FormHookDev from "@/components/Helpers/FormHookDev";
import InpPasswordMatch from "../Inputs/InpPasswordMatch";
import { signUpSubmit } from "@/lib/submit/signUpSubmit";
import { useRouter } from "next/navigation";

import {
  validateEmailDisposable,
  validateEmailFormat,
  validateRequiredEmail,
  validateEmailUnique,
} from "@/lib/validation/emailValidation";

import {
  validateRequiredUsername,
  validateUsernameFormat,
  validateUsernameUnique,
} from "@/lib/validation/usernameValidation";

import {
  validateRequiredPassword,
  validatePasswordLength,
  validatePasswordFormat,
  validateConfirmPassword,
} from "@/lib/validation/passwordValidation";

const emailValidation = {
  validateRequiredEmail,
  validateEmailDisposable,
  validateEmailFormat,
  validateEmailUnique,
};

const usernameValidation = {
  validateRequiredUsername,
  validateUsernameFormat,
  validateUsernameUnique,
};

const passwordValidation = {
  validateRequiredPassword,
  validatePasswordLength,
  validatePasswordFormat,
};

export default function SignUp() {
  const from = useForm<FromSignUp>();
  const { register, control, handleSubmit, formState, setValue, watch } = from;
  const { errors, isSubmitting } = formState;
  const [signUpError, setSignUpError] = useState<string>(" ");
  const route = useRouter();

  const signIn = async (data: FromLogin) => {
    const res = await signInSubmit(data);
    if (res.ok) {
      route.push("/");
      return;
    }
    route.push("/auth/sign-up");
  };

  const onSubmit = async (data: FromSignUp) => {
    const res = await signUpSubmit({
      ...data,
    });

    if (res.error) {
      //error
      setSignUpError(res.error);
      setValue("password", "");
      setValue("confirmPassword", "");
      return;
    }
    await signIn({
      username: data.username,
      password: data.password,
    });
  };

  return (
    <>
      <Box
        component={Paper}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            minHeight: "calc(100vh  -  64px)",
            height: "100%",
            width: "100%",
            maxWidth: "600px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          component={Paper}
          elevation={8}
          square
          py={2}
        >
          <Stack
            flexGrow={1}
            spacing={2}
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <SignUpHeader />
            <Typography variant="h6" color="error" textAlign="center">
              {signUpError}
            </Typography>
            <InpUsername
              register={register("username", {
                validate: usernameValidation,
              })}
              error={errors.username}
            />
            <InpEmail
              register={register("email", {
                validate: emailValidation,
              })}
              error={errors.email}
            />

            <InpPasswordMatch
              register={{
                password: register("password", {
                  validate: passwordValidation,
                }),
                confirmPassword: register("confirmPassword", {
                  required: "Confirm Password required.",
                  validate: {
                    confirmPassword: (confirmPassword) =>
                      validateConfirmPassword(
                        confirmPassword,
                        watch("password")
                      ),
                  },
                }),
              }}
              error={{
                password: errors.password,
                confirmPassword: errors.confirmPassword,
              }}
            />

            <Button
              type="submit"
              fullWidth
              color="primary"
              variant="contained"
              disabled={isSubmitting}
              startIcon={isSubmitting && <CircularProgress size={20} />}
              sx={{ my: 2 }}
            >
              {isSubmitting ? "" : "Sign Up"}
            </Button>
            <SignUpFooter />
          </Stack>
        </Box>
      </Box>
      <FormHookDev control={control} />
    </>
  );
}
