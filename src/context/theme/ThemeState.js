import React, { useReducer } from "react";
import { createTheme } from "@mui/material/styles";

import ThemeContext from "./themeContext";
import themeReducer from "./themeReducer";
import { SET_DARK_THEME, SET_LIGHT_THEME } from "../types";

const baseTheme = createTheme({
  typography: {
    fontFamily: "'Work Sans', sans-serif",
    fontSize: 14,
    fontFamilySecondary: "'Roboto Condensed', sans-serif",
  },
});

const ThemeState = (props) => {
  const initialState = {
    isDark: false,
    theme: null,
  };
  const [state, dispatch] = useReducer(themeReducer, initialState);

  // Set Dark

  const setDark = () => {
    const darkTheme = createTheme({
      ...baseTheme,
      palette: {
        type: "dark",
        primary: {
          main: "#089468",
        },
        secondary: {
          main: "#f50057",
        },
        success: {
          main: "#c2ff70",
        },
      },
    });
    dispatch({
      type: SET_DARK_THEME,
      payload: { isDark: true, theme: darkTheme },
    });
  };

  // Set Light
  const setLight = () => {
    const lightTheme = createTheme({
      ...baseTheme,
      palette: {
        type: "light",
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
    dispatch({
      type: SET_LIGHT_THEME,
      payload: lightTheme,
    });
  };

  return (
    <ThemeContext.Provider
      value={{
        theme: state.theme,
        setDark,
        setLight,
      }}
    >
      {props.children}
    </ThemeContext.Provider>
  );
};

export default ThemeState;
