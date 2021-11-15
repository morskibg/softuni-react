import { createTheme } from "@mui/material/styles";

const baseTheme = createTheme({
  typography: {
    fontFamily: "'Work Sans', sans-serif",
    fontSize: 14,
    fontFamilySecondary: "'Roboto Condensed', sans-serif",
  },
});

const darkTheme = createTheme({
  ...baseTheme,
  palette: {
    type: "dark",
    primary: {
      main: "#26a27b",
    },
    secondary: {
      main: "#fafafa",
    },
  },
});
const lightTheme = createTheme({
  ...baseTheme,
  palette: {
    type: "light",
    primary: {
      main: "#fafafa",
    },
    secondary: {
      main: "#26a27b",
    },
  },
});

export { darkTheme, lightTheme };
