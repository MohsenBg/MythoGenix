"use client";
import { InputAdornment, TextField } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import React from "react";
import { UseFormRegisterReturn, FieldError } from "react-hook-form";

interface Props {
  register: UseFormRegisterReturn<"email">;
  error: FieldError | undefined;
  size?: "small" | "medium";
}

export default function InpEmail({ register, error, size }: Props) {
  return (
    <>
      <TextField
        margin="normal"
        type="email"
        fullWidth
        id="emailAddress"
        label="Email Address *"
        autoComplete="email"
        color={error ? "error" : "primary"}
        helperText={error ? error.message : " "}
        size={!size ? "medium" : size}
        error={!!error}
        {...register}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end" sx={{ pr: 1 }}>
              <EmailIcon />
            </InputAdornment>
          ),
        }}
      />
    </>
  );
}
