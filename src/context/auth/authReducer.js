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
} from "../types";

const authReducer = (state, action) => {
  console.log("in AUTH reducer", action.type);
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
        isAuthenticated: true,
        isAdmin: action.payload.data.isAdmin,
        isGuest: action.payload.data.isGuest,
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
        loading: false,
        user: null,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    case GET_ROLE:
      console.log("GET");
      return {
        ...state,
        isAdmin: action.payload.is_admin,
        isGuest: action.payload.is_guest,
      };
    case GET_USER_DATA:
      return {
        ...state,
        user: action.payload,
      };

    default:
      return state;
  }
};
export default authReducer;
