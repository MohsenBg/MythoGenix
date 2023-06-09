"use client";
import { fetchVerifyEmail } from "@/lib/fetch/post/verifyEmailPost";
import React, { useEffect, useRef, useState } from "react";
import Typography from "@mui/material/Typography";
import { Box, CircularProgress } from "@mui/material";
import { useSession } from "next-auth/react";

export default function TokenVerification({ token }: { token: string }) {
  const { data: session, update, status } = useSession();
  const [resultMessage, setResultMessage] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const verified = useRef(false);
  const verifyEmail = async () => {
    setLoading(true);
    const res = await fetchVerifyEmail(token);
    if (!res) {
      setResultMessage("request failed. please try agin");
    } else if (res.error) {
      setResultMessage(res.error.message);
    } else if (res.success) {
      verified.current = true;
      setResultMessage("your email verified successfully");
    } else {
      setResultMessage("something happened please try again");
    }
    setLoading(false);
  };

  const updateSession = async () => {
    if (!session) {
      return;
    }
    if (!session.user.email.verified) {
      await update({
        email: {
          address: session.user.email.address,
          verified: true,
          verifyExpiresAt: null,
          verifyToken: null,
        },
      });
    }
  };
  useEffect(() => {
    verifyEmail();
  }, []);

  useEffect(() => {
    if (status !== "loading" && verified) {
      updateSession();
      return;
    }
  }, [status, verified]);

  return (
    <Box
      width="100%"
      height="100%"
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      {loading || status === "loading" ? (
        <CircularProgress color="inherit" size={80} />
      ) : (
        <Typography variant="h5" color="inherit" textAlign="center">
          {resultMessage}
        </Typography>
      )}
    </Box>
  );
}
