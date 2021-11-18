import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
  USERS_LOADED,
  ADMIN_ERROR,
} from "../types";

const adminReducer = (state, action) => {
  switch (action.type) {
    case USERS_LOADED:
      console.log("in USERS_LOADED");
      return {
        ...state,
        loading: false,
        users: action.payload,
      };
    case ADMIN_ERROR:
      return {
        ...state,
        error: action.payload,
        currentUser: null,
        users: [],
        loading: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
export default adminReducer;
