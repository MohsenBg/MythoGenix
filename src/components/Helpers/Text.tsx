"use client";
import { Typography } from "@mui/material";
import React from "react";

export default function Text({ text }: { text: string }) {
  return (
    <Typography
      variant="h5"
      component="div"
      p={2}
      sx={{
        flexGrow: 1,
        textAlign: "center",
      }}
    >
      {text}
    </Typography>
  );
}
