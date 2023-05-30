"use client";
import React from "react";
import { Grid, Link as MuiLink } from "@mui/material";
import NextLink from "next/link";
export default function RegisterFooter() {
  return (
    <Grid container>
      <Grid item xs />
      <Grid item>
        <MuiLink
          variant="body2"
          component={NextLink}
          prefetch={false}
          //@ts-ignore
          href={{ pathname: "/login" }}
        >
          {"Already have an account? Sign in"}
        </MuiLink>
      </Grid>
    </Grid>
  );
}
