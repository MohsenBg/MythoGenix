"use client";
import React from "react";
import { Grid, Link as MuiLink } from "@mui/material";
import NextLink from "next/link";
export default function SignInFooter() {
  return (
    <Grid container>
      <Grid item xs>
        <MuiLink
          variant="body2"
          component={NextLink}
          prefetch={false}
          //@ts-ignore
          href={{ pathname: "/" }}
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
          href={{ pathname: "/auth/sign-up" }}
        >
          {"Don't have an account? Sign Up"}
        </MuiLink>
      </Grid>
    </Grid>
  );
}
