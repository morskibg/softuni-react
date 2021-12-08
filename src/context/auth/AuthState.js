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
  // console.log("AUTH STATE IS LOADING....");
  const initialState = {
    token: localStorage.getItem("token"),
    // isAuthenticated: checkAuthToken(),
    // isAuthenticated: localStorage.getItem("token") ? true : false,
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
        // console.log("auth error from ADMIN context DELETING TOKEN");
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
    // console.log(
    //   "🚀 ~ file: AuthState.js ~ line 61 ~ verifyToken ~ verifyToken"
    // );
    try {
      const token = localStorage.getItem("token");
      const decoded = jwt_decode(token);
      const isValidToken = decoded.exp > ~~(Date.now() / 1000);
      // const isValidToken2 = ~~(Date.now() / 1000);
      const isAdmin = decoded.is_admin;
      const isGuest = decoded.is_guest;
      // console.log(
      //   "🚀 ~ file: AuthState.js ~ line 49 ~ verifyToken ~ isValidToken",
      //   isValidToken
      // );
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
      errorHandler(err, AUTH_ERROR);
      // const errMsg = Array.isArray(err.response.data.detail)
      //   ? err.response.data.detail[0]["msg"]
      //   : err.response.data.detail;
      // dispatch({ type: AUTH_ERROR, payload: errMsg });
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
        "https://backend-react-powerapp.herokuapp.com/api/v1/login/access-token",
        // "/api/v1/login/access-token",
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

      // loadUser();
    } catch (err) {
      errorHandler(err, LOGIN_FAIL);
      // const errMsg = Array.isArray(err.response.data.detail)
      //   ? err.response.data.detail[0]["msg"]
      //   : err.response.data.detail;
      // dispatch({
      //   type: LOGIN_FAIL,
      //   payload: errMsg,
      // });
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
      const res = await axios.get("/api/v1/users/me");

      dispatch({
        type: GET_USER_DATA,
        payload: res.data,
      });
    } catch (err) {
      errorHandler(err, AUTH_ERROR);
      // const errMsg = Array.isArray(err.response.data.detail)
      //   ? err.response.data.detail[0]["msg"]
      //   : err.response.data.detail;
      // dispatch({ type: AUTH_ERROR, payload: errMsg });
    }
  };
  // const getRole = () => {
  //   const token = localStorage.getItem("token");

  //   if (!token) {
  //     dispatch({
  //       type: AUTH_ERROR,
  //       payload: { alert: { msg: "Invalid token", type: "danger" } },
  //     });
  //   }
  //   try {
  //     const decoded = jwt_decode(token);
  //     dispatch({
  //       type: GET_ROLE,
  //       payload: decoded,
  //     });
  //   } catch (error) {
  //     dispatch({
  //       type: LOGIN_FAIL,
  //       payload: error,
  //     });
  //   }
  // };

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
        // getRole,
        getUserData,
        verifyToken,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
