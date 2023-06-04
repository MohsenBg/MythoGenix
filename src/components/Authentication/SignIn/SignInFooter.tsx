"use client";
import React from "react";
import { Grid, Link as MuiLink } from "@mui/material";
import NextLink from "next/link";
import { FORGET_PASSWORD_ROUTE, SIGN_UP_ROUTE } from "@/constants/routeConfig";
export default function SignInFooter() {
  return (
    <Grid container>
      <Grid item xs>
        <MuiLink
          variant="body2"
          component={NextLink}
          prefetch={false}
          //@ts-ignore
          href={{ pathname: `${FORGET_PASSWORD_ROUTE}` }}
        >
          Forgot password?
        </MuiLink>
      </Grid>
      <Grid item>
        <MuiLink
          variant="body2"
          component={NextLink}
          prefetch={false}
          //@ts-ignore
          href={{ pathname: `${SIGN_UP_ROUTE}` }}
        >
          {"Don't have an account? Sign Up"}
        </MuiLink>
      </Grid>
    </Grid>
  );
}
