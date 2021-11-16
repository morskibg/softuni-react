import { createTheme } from "@mui/material/styles";

import red from "@mui/material/colors/red";
// import orange from "@mui/material/colors/orange";
// import yellow from "@mui/material/colors/yellow";
// import green from "@mui/material/colors/green";
// import lightBlue from "@mui/material/colors/lightBlue";
import deepOrange from "@mui/material/colors/deepOrange";
import grey from "@mui/material/colors/grey";

const baseTheme = createTheme({
  typography: {
    fontFamily: "'Work Sans', sans-serif",
    fontSize: 14,
    fontFamilySecondary: "'Roboto Condensed', sans-serif",
  },
});

const darkTheme = createTheme({
  // ...baseTheme,

  palette: {
    mode: "dark",
    background: {
      default: "#2b2a33",
      paper: "#2C3E50",
    },
    primary: {
      main: "#00ddff",
    },
    secondary: {
      main: "#FFFF8D",
    },
    success: {
      main: "#c2ff70",
    },
    error: {
      main: "#9932CC",
    },
    text: {
      primary: "#00ddff",
      // secondary: grey[500],
    },
  },

  // typography: {
  //   allVariants: {
  //     color: "#00ff99",
  //   },
  // },
});

const lightTheme = createTheme({
  ...baseTheme,
  palette: {
    type: "light",
    background: {
      default: " #E6E6FA",
      paper: "#B0C4DE",
    },
    primary: {
      main: "#880e4f",
    },
    secondary: {
      main: "#ff6f00",
    },
    success: {
      main: "#c2ff70",
    },
    error: {
      main: "#d40508",
    },
  },
});
export { darkTheme, lightTheme };
