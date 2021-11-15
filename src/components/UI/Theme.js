import { createMuiTheme } from "@material-ui/core/styles"
​
const baseTheme = createMuiTheme({
  typography: {
    fontFamily: "'Work Sans', sans-serif",
    fontSize: 14,
    fontFamilySecondary: "'Roboto Condensed', sans-serif"
  }
})
​
const darkTheme = createMuiTheme({
  ...baseTheme,
  palette: {
    type: "dark",
    primary: {
      main: "#26a27b"
    },
    secondary: {
      main: "#fafafa"
    }
  }
})
const lightTheme = createMuiTheme({
  ...baseTheme,
  palette: {
    type: "light",
    primary: {
      main: "#fafafa"
    },
    secondary: {
      main: "#26a27b"
    }
  }
})
​
export { darkTheme, lightTheme }