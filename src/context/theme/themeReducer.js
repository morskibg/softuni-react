import { TOGGLE_THEME } from "../types";

const themeReducer = (state, action) => {
  console.log("in theme reducer");
  switch (action.type) {
    case TOGGLE_THEME:
      console.log(state.isDark);
      localStorage.setItem("isDark", !state.isDark);
      return {
        ...state,
        isDark: !state.isDark,
      };

    default:
      return { ...state, isDark: false };
  }
};
export default themeReducer;
