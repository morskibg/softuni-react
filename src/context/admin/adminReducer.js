import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  CLEAR_ERRORS,
  USERS_LOADED,
  ADMIN_ERROR,
  CLEAR_USERS,
  START_LOADER,
  DELETE_USER,
  SET_CURRENT_USER,
  CLEAR_CURRENT_USER,
  SET_MODIFIER,
  CLEAR_MODIFIER,
  UPDATE_USER,
  AUTH_ERROR,
} from "../types";

const adminReducer = (state, action) => {
  switch (action.type) {
    case REGISTER_SUCCESS:
      // console.log(
      //   "🚀 ~ file: adminReducer.js ~ line 19 ~ adminReducer ~ action.payload",
      //   action.payload
      // );

      return {
        ...state,
        ...action.payload.data,
        loading: false,
        error: action.payload.alert,
      };
    case USERS_LOADED:
      return {
        ...state,
        loading: false,
        users: action.payload.sort((a, b) => a.id - b.id),
      };
    case REGISTER_FAIL:
    case ADMIN_ERROR:
      // console.log("in ADMIN_ERROR");
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
    case CLEAR_CURRENT_USER:
      return {
        ...state,
        currentUser: null,
      };
    case UPDATE_USER:
      return {
        ...state,
        loading: false,
        error: action.payload.alert,
        users: state.users.map((x) =>
          x.id === action.payload.data.id ? action.payload.data : x
        ),
      };
    case DELETE_USER:
      return {
        ...state,
        users: state.users.filter((x) => x.email !== action.payload.email),
      };
    case SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
      };
    case START_LOADER:
      return {
        ...state,
        loading: true,
      };
    case SET_MODIFIER:
      return {
        ...state,
        isModified: true,
      };
    case CLEAR_MODIFIER:
      return {
        ...state,
        isModified: false,
      };

    case AUTH_ERROR:
      // console.log("in AUTH ERROR Reduer - will delete token !!!!");
      localStorage.removeItem("token");

      return {
        ...state,
        token: null,
        loading: false,
        users: [],
        error: action.payload.alert,
      };
    default:
      return state;
  }
};
export default adminReducer;
