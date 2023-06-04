"use client";
import React from "react";
import { Grid, Link as MuiLink } from "@mui/material";
import NextLink from "next/link";
import { SIGN_IN_ROUTE } from "@/constants/routeConfig";
export default function SignUpFooter() {
  return (
    <Grid container>
      <Grid item xs />
      <Grid item>
        <MuiLink
          variant="body2"
          component={NextLink}
          prefetch={false}
          //@ts-ignore
          href={{ pathname: `${SIGN_IN_ROUTE}` }}
        >
          {"Already have an account? Sign in"}
        </MuiLink>
      </Grid>
    </Grid>
  );
}
