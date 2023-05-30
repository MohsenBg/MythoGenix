"use client";
import { InputAdornment, TextField } from "@mui/material";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import React from "react";
import { UseFormRegisterReturn, FieldError } from "react-hook-form";

interface Props {
  register: UseFormRegisterReturn<"username">;
  error: FieldError | undefined;
  size?: "small" | "medium";
}

export default function InpUsername({ register, error, size }: Props) {
  return (
    <>
      <TextField
        margin="normal"
        fullWidth
        id="username"
        label="Username *"
        autoComplete="username"
        autoFocus
        size={!size ? "medium" : size}
        color={error ? "error" : "primary"}
        helperText={error?.message ? error.message : " "}
        error={!!error}
        {...register}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end" sx={{ pr: 1 }}>
              <PersonRoundedIcon />
            </InputAdornment>
          ),
        }}
      />
    </>
  );
}
