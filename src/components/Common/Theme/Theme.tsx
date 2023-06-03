"use client";
import { Box, ThemeProvider, createTheme } from "@mui/material";
import { CssBaseline } from "@mui/material";
import NavBar from "../Navbar/Navbar";
import { navBarSizePx } from "@/constants/sizeConstants";

const muiTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export default function Theme({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <NavBar />
      <Box sx={{ height: `calc(100vh - ${navBarSizePx}px)` }}>{children}</Box>
    </ThemeProvider>
  );
}
