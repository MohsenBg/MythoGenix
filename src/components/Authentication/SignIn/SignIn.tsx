"use client";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import InpUsername from "../Inputs/InpUsername";
import InpPassword from "../Inputs/InpPassword";
import SignInHeader from "./SignInHeader";
import SignInFooter from "./SignInFooter";
import { useForm } from "react-hook-form";
import { FromLogin } from "@/interfaces/IFromLogin";
import FormHookDev from "@/components/Helpers/FormHookDev";
import { useRouter } from "next/navigation";
import { signInSubmit } from "@/lib/submit/signInSubmit";
import { HOME_ROUTE } from "@/constants/routeConfig";

export default function SignIn() {
  const from = useForm<FromLogin>();
  const { register, control, handleSubmit, formState, setValue } = from;
  const { errors, isSubmitting } = formState;
  const [signInError, setSignInError] = useState<string>(" ");
  const route = useRouter();
  const onSubmit = async (data: FromLogin) => {
    const res = await signInSubmit(data);
    if (res.ok) {
      route.push(HOME_ROUTE);
      return;
    }
    setSignInError(res.error || "");
    setValue("password", "");
  };

  return (
    <>
      <Grid container component="div" sx={{ height: "100%" }}>
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
          <SignInHeader />
          <Typography variant="h6" color="error" textAlign="center">
            {signInError}
          </Typography>
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
              disabled={isSubmitting}
              startIcon={isSubmitting && <CircularProgress size={20} />}
              sx={{ my: 2 }}
            >
              {isSubmitting ? "" : "Sign In"}
            </Button>
            <SignInFooter />
          </Box>
        </Grid>
      </Grid>
      <FormHookDev control={control} />
    </>
  );
}
