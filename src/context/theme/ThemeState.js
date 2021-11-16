import React, { useReducer } from "react";
import { createTheme } from "@mui/material/styles";

import ThemeContext from "./themeContext";
import themeReducer from "./themeReducer";
import { TOGGLE_THEME } from "../types";

const ThemeState = (props) => {
  const initialState = {
    isDark: localStorage.getItem("isDark"),
  };
  const [state, dispatch] = useReducer(themeReducer, initialState);

  // // Set Dark

  // const setDark = () => {
  //   dispatch({
  //     type: SET_DARK_THEME,
  //   });
  // };

  // // Set Light
  // const setLight = () => {
  //   dispatch({
  //     type: SET_LIGHT_THEME,
  //   });
  // };

  const toggle = () => {
    dispatch({
      type: TOGGLE_THEME,
    });
  };

  return (
    <ThemeContext.Provider
      value={{
        isDark: state.isDark,
        toggle,
      }}
    >
      {props.children}
    </ThemeContext.Provider>
  );
};

export default ThemeState;
