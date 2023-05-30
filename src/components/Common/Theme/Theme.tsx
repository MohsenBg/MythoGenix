"use client";
import { Box, ThemeProvider, createTheme } from "@mui/material";
import { CssBaseline } from "@mui/material";
import NavBar from "../Navbar/Navbar";

const muiTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const navBarSizePx = 64;
export default function Theme({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <NavBar navSize={navBarSizePx} />
      <Box sx={{ height: `calc(100vh - ${navBarSizePx}px)` }}>{children}</Box>
    </ThemeProvider>
  );
}
