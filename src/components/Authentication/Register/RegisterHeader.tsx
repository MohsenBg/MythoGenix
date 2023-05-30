"use client";
import React from "react";
import Avatar from "@mui/material/Avatar";
import { Box, Typography } from "@mui/material";
import HowToRegIcon from "@mui/icons-material/HowToRegOutlined";

export default function RegisterHeader() {
  return (
    <Box
      sx={{
        mx: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: "secondary.main", p: 4 }}>
        <HowToRegIcon sx={{ fontSize: "34px" }} />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign up
      </Typography>
    </Box>
  );
}
