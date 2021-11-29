import React, { useReducer } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import AuthContext from "./authContext";
import authReducer from "./authReducer";
import setAuthHeader from "../../utils/setAuthHeader";
import {
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
    isAdmin: localStorage.getItem("token")
      ? jwt_decode(localStorage.getItem("token")).is_admin
      : false,
    isGuest: localStorage.getItem("token")
      ? jwt_decode(localStorage.getItem("token")).is_guest
      : false,
    loading: true,
    user: null,
    error: null,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  // Load User
  const loadUser = async () => {
    setAuthHeader(localStorage.token);

    try {
      const res = await axios.get("/api/v1/users/me");
      // console.log("🚀 ~ file: AuthState.js ~ line 39 ~ loadUser ~ res", res);

      dispatch({
        type: USER_LOADED,
        payload: {
          data: res.data,
          alert: { msg: "Successfully logged in", type: "success" },
        },
      });
    } catch (err) {
      const errMsg = Array.isArray(err.response.data.detail)
        ? err.response.data.detail[0]["msg"]
        : err.response.data.detail;
      dispatch({ type: AUTH_ERROR, payload: errMsg });
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

      const decoded = jwt_decode(res.data.access_token);

      dispatch({
        type: LOGIN_SUCCESS,
        payload: {
          data: {
            token: res.data.access_token,
            isAdmin: decoded.is_admin,
            isGuest: decoded.is_guest,
          },
          msg: "",
        },
        // payload: { data: res.data, msg: "" },
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

  const getUserData = async () => {
    setAuthHeader(localStorage.token);

    try {
      const res = await axios.get("/api/v1/users/me");

      dispatch({
        type: GET_USER_DATA,
        payload: res.data,
      });
    } catch (err) {
      const errMsg = Array.isArray(err.response.data.detail)
        ? err.response.data.detail[0]["msg"]
        : err.response.data.detail;
      dispatch({ type: AUTH_ERROR, payload: errMsg });
    }
  };
  const getRole = () => {
    const token = localStorage.getItem("token");

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
