import React, { useReducer } from "react";
import ThemeContext from "./themeContext";
import themeReducer from "./themeReducer";
import { TOGGLE_THEME } from "../types";

const ThemeState = (props) => {
  const initialState = {
    themeMode: localStorage.getItem(process.env.REACT_APP_THEME_TOKEN_NAME),
  };
  console.log(
    `🚀 ~ file: ThemeState.js ~ line 9 ~ ThemeState ~ localStorage.getItem(${process.env.REACT_APP_THEME_TOKEN_NAME})`,
    localStorage.getItem(process.env.REACT_APP_THEME_TOKEN_NAME)
  );
  const [state, dispatch] = useReducer(themeReducer, initialState);

  const toggle = () => {
    dispatch({
      type: TOGGLE_THEME,
    });
  };

  return (
    <ThemeContext.Provider
      value={{
        themeMode: state.themeMode,
        toggle,
      }}
    >
      {props.children}
    </ThemeContext.Provider>
  );
};

export default ThemeState;
