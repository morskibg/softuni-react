import { SET_DARK_THEME, SET_LIGHT_THEME } from "../types";

const themeReducer = (state, action) => {
  console.log("in theme reducer");
  switch (action.type) {
    case SET_DARK_THEME:
      console.log(state);
      console.log(action.payload.theme);
      return {
        ...state,
        theme: action.payload.theme,
        isDark: action.payload.isDark,
      };
    case SET_LIGHT_THEME:
    default:
      return { ...state, theme: action.theme };
  }
};
export default themeReducer;
