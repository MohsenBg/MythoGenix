"use client";
import { Box, Button, Grid, Paper, Stack } from "@mui/material";
import React from "react";
import InpUsername from "../Inputs/InpUsername";
import InpEmail from "../Inputs/InpEmail";
import RegisterHeader from "./RegisterHeader";
import RegisterFooter from "./RegisterFooter";
import { useForm } from "react-hook-form";
import { FromRegister } from "@/interfaces/IFromRegister";
import FormHookDev from "@/components/Helpers/FormHookDev";
import InpPasswordMatch from "../Inputs/InpPasswordMatch";
import {
  validateEmailDisposable,
  validateEmailFormat,
  validateRequiredEmail,
} from "@/lib/validation/emailValidation";

import {
  validateRequiredUsername,
  validateUsernameFormat,
} from "@/lib/validation/usernameValidation";

import {
  validateRequiredPassword,
  validatePasswordLength,
  validatePasswordFormat,
  validateConfirmPassword,
} from "@/lib/validation/passwordValidation";

const emailValidation = {
  validateRequiredEmail,
  validateEmailDisposable,
  validateEmailFormat,
};

const usernameValidation = {
  validateRequiredUsername,
  validateUsernameFormat,
};

const passwordValidation = {
  validateRequiredPassword,
  validatePasswordLength,
  validatePasswordFormat,
};

export default function Register() {
  const from = useForm<FromRegister>();
  const { register, control, handleSubmit, formState, watch } = from;
  const { errors } = formState;

  const onSubmit = (data: FromRegister) => {
    console.log(data);
  };

  return (
    <Grid
      container
      component={Paper}
      sx={{ minHeight: "100%" }}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Grid
        xl={3}
        lg={4}
        md={6}
        sm={8}
        xs={10}
        item
        component={Paper}
        borderRadius={1}
        elevation={8}
        square
        py={2}
      >
        <Stack
          spacing={1.5}
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <RegisterHeader />
          <InpUsername
            size="small"
            register={register("username", {
              validate: usernameValidation,
            })}
            error={errors.username}
          />
          <InpEmail
            size="small"
            register={register("email", {
              validate: emailValidation,
            })}
            error={errors.email}
          />

          <InpPasswordMatch
            size="small"
            register={{
              password: register("password", {
                validate: passwordValidation,
              }),
              confirmPassword: register("confirmPassword", {
                required: "Confirm Password required.",
                validate: {
                  confirmPassword: (confirmPassword) =>
                    validateConfirmPassword(confirmPassword, watch("password")),
                },
              }),
            }}
            error={{
              password: errors.password,
              confirmPassword: errors.confirmPassword,
            }}
          />

          <Button
            type="submit"
            fullWidth
            color="primary"
            variant="contained"
            sx={{ my: 2 }}
          >
            Sign In
          </Button>
          <RegisterFooter />
        </Stack>
      </Grid>
      <FormHookDev control={control} />
    </Grid>
  );
}
