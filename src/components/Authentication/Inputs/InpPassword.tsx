"use client";
import {
  Box,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import React, { useState } from "react";
import { UseFormRegisterReturn, FieldError } from "react-hook-form";

interface Props {
  register: UseFormRegisterReturn<"password">;
  error: FieldError | undefined;
  size?: "small" | "medium";
}

export default function InpPassword({ register, error, size }: Props) {
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
        color={error ? "error" : "primary"}
        helperText={error ? error.message : " "}
        error={!!error}
        {...register}
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
      <Box width="100%" pl={2}>
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        />
      </Box>
    </>
  );
}
