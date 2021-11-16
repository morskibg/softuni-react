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
  IS_ADMIN,
} from "../types";

const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: localStorage.getItem("token") ? true : false,
    isAdmin: false,
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

      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    } catch (err) {
      dispatch({ type: AUTH_ERROR });
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

      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });

      loadUser();
    } catch (err) {
      dispatch({
        type: REGISTER_FAIL,
        payload: err.response.data.detail,
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
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });

      loadUser();
    } catch (err) {
      dispatch({
        type: LOGIN_FAIL,
        payload: err.response.data.detail,
      });
    }
  };

  // Logout
  const logout = () => dispatch({ type: LOGOUT });

  // Clear Errors
  const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

  const isAdmin = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      return false;
    }
    const decoded = jwt_decode(token);
    console.log(
      "🚀 ~ file: AuthState.js ~ line 114 ~ isAdmin ~ decoded",
      decoded
    );
    dispatch({
      type: IS_ADMIN,
      payload: decoded.is_admin,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error,
        register,
        loadUser,
        login,
        logout,
        clearErrors,
        isAdmin,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
