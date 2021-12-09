import { createTheme } from "@mui/material/styles";

// const baseTheme = createTheme({
//   typography: {
//     fontFamily: "'Work Sans', sans-serif",
//     fontSize: 14,
//     fontFamilySecondary: "'Roboto Condensed', sans-serif",
//   },
// });

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
    info: {
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
    barChart: {
      primary: "#ec5990",
      secondary: "#aa4446",
      third: "#ff7139",
      // secondary: grey[500],
    },
  },
});

const lightTheme = createTheme({
  // ...baseTheme,
  palette: {
    type: "light",
    background: {
      default: " #E6E6FA",
      paper: "#B0C4DE",
    },
    primary: {
      main: "#880e4f",
    },
    info: {
      main: "#880e4f",
    },
    secondary: {
      main: "#ff6f00",
    },
    success: {
      main: "#c2ff70",
    },
    error: {
      main: "#ff0000",
    },
    barChart: {
      primary: "#ec5990",
      secondary: "#115990",
      third: "#ff7139",
      // secondary: grey[500],
    },
  },
});
export { darkTheme, lightTheme };
