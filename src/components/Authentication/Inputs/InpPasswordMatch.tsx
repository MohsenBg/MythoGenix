"use client";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import React, { useState } from "react";
import { UseFormRegisterReturn, FieldError } from "react-hook-form";

interface Props {
  register: {
    password: UseFormRegisterReturn<"password">;
    confirmPassword: UseFormRegisterReturn<"confirmPassword">;
  };
  error: {
    password: FieldError | undefined;
    confirmPassword: FieldError | undefined;
  };
  size?: "small" | "medium";
}

export default function InpPasswordMatch({ register, error, size }: Props) {
  const [showPass, setShowPass] = useState(false);

  return (
    <>
      <TextField
        margin="normal"
        fullWidth
        type={showPass ? "text" : "password"}
        id="password"
        label="Password *"
        size={!size ? "medium" : size}
        color={error.password ? "error" : "primary"}
        helperText={error.password ? error.password.message : " "}
        error={!!error.password}
        {...register.password}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => setShowPass(!showPass)}>
                {showPass ? (
                  <VisibilityOffRoundedIcon />
                ) : (
                  <VisibilityRoundedIcon />
                )}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <TextField
        margin="normal"
        fullWidth
        type={showPass ? "text" : "password"}
        id="password"
        label="Confirm Password *"
        size={!size ? "medium" : size}
        color={error.confirmPassword ? "error" : "primary"}
        helperText={error.confirmPassword ? error.confirmPassword.message : " "}
        error={!!error.confirmPassword}
        {...register.confirmPassword}
      />
    </>
  );
}
