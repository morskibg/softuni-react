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
  GET_USER_DATA,
  VERIFY_TOKEN,
} from "../types";

const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: localStorage.getItem("token")
      ? jwt_decode(localStorage.getItem("token")).exp > ~~(Date.now() / 1000)
        ? true
        : false
      : false,
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

  const errorHandler = (error, reducerType) => {
    if (error.response) {
      // Request made and server responded
      if (error.response.status === 403 || error.response.status === 401) {
        dispatch({
          type: AUTH_ERROR,
          payload: { alert: { msg: "Invalid token", type: "danger" } },
        });
      }
      let errMsg = error;
      try {
        errMsg = Array.isArray(error.response.data.detail)
          ? error.response.data.detail[0]["msg"]
          : error.response.data.detail;
      } catch (error) {
        dispatch({
          type: reducerType,
          payload: { alert: { msg: errMsg, type: "danger" } },
        });
      }
    } else if (error.request) {
      // The request was made but no response was received
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message);
    }
  };

  const verifyToken = () => {
    try {
      const token = localStorage.getItem("token");
      const decoded = jwt_decode(token);
      const isValidToken = decoded.exp > ~~(Date.now() / 1000);
      const isAdmin = decoded.is_admin;
      const isGuest = decoded.is_guest;
      dispatch({
        type: VERIFY_TOKEN,
        payload: { isValidToken, isAdmin, isGuest },
      });
    } catch {
      dispatch({
        type: AUTH_ERROR,
        payload: { alert: { msg: "Invalid token", type: "danger" } },
      });
    }
  };

  // Load User
  const loadUser = async () => {
    setAuthHeader(localStorage.token);

    try {
      const res = await axios.get("users/me");

      dispatch({
        type: USER_LOADED,
        payload: {
          data: res.data,
          alert: { msg: "Successfully logged in", type: "success" },
        },
      });
    } catch (err) {
      errorHandler(err, AUTH_ERROR);
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
      const res = await axios.post("login/access-token", credentials, config);

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
      });
    } catch (err) {
      errorHandler(err, LOGIN_FAIL);
    }
  };

  // Logout
  const logout = () =>
    dispatch({
      type: LOGOUT,
      payload: {
        data: null,
        alert: { msg: "Successfully logged out", type: "success" },
      },
    });

  // Clear Errors
  const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

  const getUserData = async () => {
    setAuthHeader(localStorage.token);

    try {
      const res = await axios.get("users/me");

      dispatch({
        type: GET_USER_DATA,
        payload: res.data,
      });
    } catch (err) {
      errorHandler(err, AUTH_ERROR);
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
        getUserData,
        verifyToken,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
