import React, { useContext, useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material";
import { darkTheme, lightTheme } from "../layout/Theme";
import { darkModeContext } from "../layout/ThemeHandler";

const Layout = ({ children }) => {
  const DarkModeContext = useContext(darkModeContext);
  const { darkMode, setDarkMode } = DarkModeContext;

  useEffect(() => {
    const theme = localStorage.getItem("preferred-theme");
    if (theme) {
      const themePreference = localStorage.getItem("preferred-theme");
      if (themePreference === "dark") {
        setDarkMode(true);
      } else {
        setDarkMode(false);
      }
    } else {
      localStorage.setItem("preferred-theme", "light");
      setDarkMode(true);
    }
  }, []);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <main>{children}</main>
    </ThemeProvider>
  );
};
