"use client";
import React from "react";
import Avatar from "@mui/material/Avatar";
import { Box, Typography } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
export default function LoginHeader() {
  return (
    <Box
      sx={{
        my: 2,
        mx: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: "primary.main", p: 4 }}>
        <LockOutlinedIcon sx={{ fontSize: "32px" }} />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
    </Box>
  );
}
