import { TOGGLE_THEME } from "../types";

const themeReducer = (state, action) => {
  switch (action.type) {
    case TOGGLE_THEME:
      const newThemeValue = state.themeMode === "dark" ? "light" : "dark";
      localStorage.setItem(
        process.env.REACT_APP_THEME_TOKEN_NAME,
        newThemeValue
      );
      return {
        ...state,
        themeMode: newThemeValue,
      };

    default:
      return { ...state, themeMode: false };
  }
};
export default themeReducer;
