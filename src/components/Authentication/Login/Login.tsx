"use client";
import { Box, Button, Grid, Paper } from "@mui/material";
import React from "react";
import InpUsername from "../Inputs/InpUsername";
import InpPassword from "../Inputs/InpPassword";
import LoginHeader from "./LoginHeader";
import LoginFooter from "./LoginFooter";
import { useForm } from "react-hook-form";
import { FromLogin } from "@/interfaces/IFromLogin";
import FormHookDev from "@/components/Helpers/FormHookDev";

export default function Login() {
  const from = useForm<FromLogin>();
  const { register, control, handleSubmit, formState } = from;
  const { errors } = formState;

  const onSubmit = (data: FromLogin) => {
    console.log(data);
  };

  return (
    <>
      <Grid container component="div" style={{ height: "100%" }}>
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url('/image/login_image.webp')",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <LoginHeader />
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{
              mt: 2,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <InpUsername
              register={register("username", {
                required: "username is required",
              })}
              error={errors.username}
            />
            <InpPassword
              register={register("password", {
                required: "password is required",
              })}
              error={errors.password}
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
            <LoginFooter />
          </Box>
        </Grid>
      </Grid>
      <FormHookDev control={control} />
    </>
  );
}
