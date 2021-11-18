import React, { useReducer } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import AuthContext from "./authContext";
import authReducer from "./authReducer";
import setAuthHeader from "../../utils/setAuthHeader";
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

const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: localStorage.getItem("token") ? true : false,
    isAdmin: false,
    isGuest: false,
    loading: true,
    user: null,
    error: null,
  };
  // console.log("in Auth State");
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Load User
  const loadUser = async () => {
    setAuthHeader(localStorage.token);

    try {
      const res = await axios.get("/api/v1/users/me");
      // console.log("🚀 ~ file: AuthState.js ~ line 39 ~ loadUser ~ res", res);

      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    } catch (err) {
      const errMsg = Array.isArray(err.response.data.detail)
        ? err.response.data.detail[0]["msg"]
        : err.response.data.detail;
      dispatch({ type: AUTH_ERROR, payload: errMsg });
    }
  };

  // Register User
  const register = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post("/api/v1/users", formData, config);
      console.log("dispatgjing registaer", REGISTER_SUCCESS);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: { data: res.data, msg: "User create successfully" },
      });

      // loadUser();
    } catch (err) {
      // console.log("🚀 ~ file: AuthState.js ~ line 68 ~ register ~ err", err);
      // console.log(err.response);
      // console.log(err.response.data);
      // console.log(err.response.data.detail[0]["msg"]);
      // console.log(err.response.data.detail.isArray);
      const errMsg = Array.isArray(err.response.data.detail)
        ? err.response.data.detail[0]["msg"]
        : err.response.data.detail;
      console.log("dispatgjing registaer", REGISTER_FAIL);
      dispatch({
        type: REGISTER_FAIL,
        payload: errMsg,
      });
    }
  };

  // Login User
  const login = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };
    const credentials = new URLSearchParams();
    credentials.append("username", formData.email);
    credentials.append("password", formData.password);

    try {
      const res = await axios.post(
        "/api/v1/login/access-token",
        credentials,
        config
      );
      console.log("dispatch after login");
      dispatch({
        type: LOGIN_SUCCESS,
        payload: { data: res.data, msg: "" },
      });

      loadUser();
    } catch (err) {
      const errMsg = Array.isArray(err.response.data.detail)
        ? err.response.data.detail[0]["msg"]
        : err.response.data.detail;
      dispatch({
        type: LOGIN_FAIL,
        payload: errMsg,
      });
    }
  };

  // Logout
  const logout = () => dispatch({ type: LOGOUT });

  // Clear Errors
  const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

  const getUserData = () => {
    dispatch({
      type: GET_USER_DATA,
    });
  };
  const getRole = () => {
    const token = localStorage.getItem("token");
    console.log("🚀 ~ file: AuthState.js ~ line 121 ~ getRole ~ token", token);
    if (!token) {
      return false;
    }
    try {
      const decoded = jwt_decode(token);
      dispatch({
        type: GET_ROLE,
        payload: decoded,
      });
    } catch (error) {
      console.log(
        "🚀 ~ file: AuthState.js ~ line 131 ~ getRole ~ error",
        error
      );
      dispatch({
        type: LOGIN_FAIL,
        payload: error,
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        isAdmin: state.isAdmin,
        isGuest: state.isGuest,
        loading: state.loading,
        user: state.user,
        error: state.error,
        register,
        loadUser,
        login,
        logout,
        clearErrors,
        getRole,
        getUserData,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
