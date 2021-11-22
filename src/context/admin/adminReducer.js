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
  CLEAR_USERS,
  START_LOADER,
} from "../types";

const adminReducer = (state, action) => {
  switch (action.type) {
    case REGISTER_SUCCESS:
      console.log("action.payload.alert", action.payload.alert);
      return {
        ...state,
        ...action.payload.data,
        loading: false,
        error: action.payload.alert,
      };
    case USERS_LOADED:
      console.log("in USERS_LOADED");
      return {
        ...state,
        loading: false,
        users: action.payload,
      };
    case REGISTER_FAIL:
    case ADMIN_ERROR:
      return {
        ...state,
        error: action.payload.alert,
        currentUser: null,
        users: [],
        loading: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    case CLEAR_USERS:
      return {
        ...state,
        users: [],
      };
    case START_LOADER:
      console.log("in START_LOADER");
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};
export default adminReducer;
