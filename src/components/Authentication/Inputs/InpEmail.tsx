"use client";
import React from "react";
import { TextField, InputAdornment } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import { UseFormRegisterReturn, FieldError } from "react-hook-form";

interface Props {
  register: UseFormRegisterReturn<"email">;
  error: FieldError | undefined;
  size?: "small" | "medium";
  disable?: boolean;
}

export default function InpEmail({
  register,
  error,
  size = "medium",
  disable = false,
}: Props) {
  return (
    <TextField
      margin="normal"
      type="email"
      fullWidth
      id="emailAddress"
      label="Email Address *"
      autoComplete="email"
      color={error ? "error" : "primary"}
      helperText={error?.message || " "}
      size={size}
      error={!!error}
      disabled={disable}
      {...register}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end" sx={{ pr: 1 }}>
            <EmailIcon />
          </InputAdornment>
        ),
      }}
    />
  );
}
