import React, { useReducer, useState, useEffect } from "react";
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
  START_LOADER,
  SET_AUTH_ALERT,
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
    loading: false,
    user: null,
    error: null,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);
  const [currentStorage, SyncWithLocalStorage] = useState(localStorage || {});

  const handleStorageChange = (e) => {
    console.log("from local storage event handler");
    verifyToken();
    SyncWithLocalStorage({ ...localStorage });
  };

  useEffect(() => {
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

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
        dispatch({
          type: reducerType,
          payload: { alert: { msg: errMsg, type: "danger" } },
        });
      } catch (error) {
        dispatch({
          type: reducerType,
          payload: {
            alert: {
              msg: "Something went wrong. Try again later !",
              type: "danger",
            },
          },
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
    console.log("IN VERIFY TOKEN");
    try {
      getUserData();
      const token = localStorage.getItem("token");
      const decoded = jwt_decode(token);
      const isValidToken = decoded.exp > ~~(Date.now() / 1000);
      const isAdmin = decoded.is_admin;
      const isGuest = decoded.is_guest;
      // console.log("in verify token", token);
      // console.log("in verify token", decoded);
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
      // console.log("🚀 ~ file: AuthState.js ~ line 119 ~ login ~ res", res);

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
      getUserData();
    } catch (err) {
      // console.log("🚀 ~ file: AuthState.js ~ line 134 ~ login ~ err", err);
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
      // console.log(res.data);

      dispatch({
        type: GET_USER_DATA,
        payload: res.data,
      });
    } catch (err) {
      errorHandler(err, AUTH_ERROR);
    }
  };

  const startLoader = () => dispatch({ type: START_LOADER });
  const setAuthAlert = (msg, type) => {
    setTimeout(() => {
      dispatch({ type: SET_AUTH_ALERT, payload: { alert: { msg, type } } });
    }, 1000);
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
        startLoader,
        setAuthAlert,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
