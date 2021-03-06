import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
  GET_ROLE,
  GET_USER_DATA,
  VERIFY_TOKEN,
  START_LOADER,
  SET_AUTH_ALERT,
} from "../types";

const authReducer = (state, action) => {
  // console.log("in AUTH reducer", action.type);
  switch (action.type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        isAdmin: action.payload.data.is_superuser ? true : false,
        loading: false,
        user: action.payload.data,
      };
    case LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.data.token);

      return {
        ...state,
        token: action.payload.data.token,
        isAuthenticated: true,
        isAdmin: action.payload.data.isAdmin,
        isGuest: action.payload.data.isGuest,
        loading: false,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        ...action.payload.data,
        isAuthenticated: true,
        isAdmin: true,
        loading: false,
        error: action.payload.msg,
      };
    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT:
      localStorage.removeItem("token");

      return {
        ...state,
        token: null,
        isAuthenticated: false,
        isAdmin: false,
        isGuest: false,
        loading: false,
        user: null,
        error: action.payload.alert,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    case SET_AUTH_ALERT:
      return {
        ...state,
        error: action.payload.alert,
      };

    case GET_ROLE:
      // console.log("GET");
      return {
        ...state,
        isAuthenticated: true,
        isAdmin: action.payload.is_admin,
        isGuest: action.payload.is_guest,
      };
    case GET_USER_DATA:
      return {
        ...state,
        user: action.payload,
      };
    case VERIFY_TOKEN:
      // console.log(action.payload);
      return {
        ...state,
        isAuthenticated: action.payload.isValidToken,
        isAdmin: action.payload.isAdmin,
        isGuest: action.payload.isGuest,
      };
    case START_LOADER:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};
export default authReducer;
