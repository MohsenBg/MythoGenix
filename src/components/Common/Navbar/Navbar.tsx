"use client";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import AdbIcon from "@mui/icons-material/Adb";
import React from "react";
import Link from "next/link";

export default function NavBar({ navSize }: { navSize: number }) {
  return (
    <Box sx={{ flexGrow: 1, mb: navSize / 8 }}>
      <AppBar sx={{ height: navSize }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="Logo"
          >
            <AdbIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            ml={1}
            sx={{
              flexGrow: 1,
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>
          <Link href={"/login"}>
            <Button color="primary">Login</Button>
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
