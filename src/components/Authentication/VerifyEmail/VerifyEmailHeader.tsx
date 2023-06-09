"use client";
import React from "react";
import { Box, Typography } from "@mui/material";
import MailLockIcon from "@mui/icons-material/MailLock";

export default function VerifyEmailHeader() {
  return (
    <Box
      sx={{
        mx: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <MailLockIcon sx={{ marginY: "10px", fontSize: "150px" }} />
      <Typography textAlign="center" component="h1" variant="h5">
        Verify Your Email Address
      </Typography>
    </Box>
  );
}
