import React, { useReducer } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import AdminContext from "./adminContext";
import adminReducer from "./adminReducer";
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
  USERS_LOADED,
  ADMIN_ERROR,
  CLEAR_USERS,
  START_LOADER,
} from "../types";

const AdminState = (props) => {
  const initialState = {
    token: localStorage.getItem("token"),
    users: [],
    currentUser: null,
    loading: false,
    error: null,
  };
  console.log("########### in ADMIN State");
  const [state, dispatch] = useReducer(adminReducer, initialState);

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
        payload: {
          data: res.data,
          alert: { msg: "User create successfully", type: "success" },
        },
      });

      // loadUser();
    } catch (err) {
      console.log("🚀 ~ file: AuthState.js ~ line 68 ~ register ~ err", err);
      // console.log(err.response);
      // console.log(err.response.data);
      // console.log(err.response.data.detail[0]["msg"]);
      // console.log(err.response.data.detail.isArray);
      const errMsg = Array.isArray(err.response.data.detail)
        ? err.response.data.detail[0]["msg"]
        : err.response.data.detail;

      console.log(
        "🚀 ~ file: AdminState.js ~ line 59 ~ register ~ errMsg",
        errMsg
      );
      dispatch({
        type: REGISTER_FAIL,
        payload: { alert: { msg: errMsg, type: "danger" } },
      });
    }
  };

  const getUsers = async () => {
    console.log("in get users");
    setAuthHeader(localStorage.token);
    try {
      const res = await axios.get("/api/v1/users");
      console.log(
        "🚀 ~ file: AdminState.js ~ line 34 ~ getUsers ################################## ~ res",
        res
      );

      dispatch({
        type: USERS_LOADED,
        payload: res.data,
      });
    } catch (err) {
      // console.log("🚀 ~ file: AdminState.js ~ line 41 ~ getUsers ~ err", err);
      let errMsg = err;
      try {
        errMsg = Array.isArray(err.response.data.detail)
          ? err.response.data.detail[0]["msg"]
          : err.response.data.detail;
      } catch (error) {
        // console.log(
        //   "🚀 ~ file: AdminState.js ~ line 48 ~ getUsers ~ error",
        //   error
        // );
      }

      dispatch({ type: ADMIN_ERROR, payload: errMsg });
    }
  };

  const clearUsersFromState = () => {
    console.log("in clearUsersFromState");
    dispatch({ type: CLEAR_USERS });
  };

  const clearErrors = () => dispatch({ type: CLEAR_ERRORS });
  const setLoader = () => dispatch({ type: START_LOADER });

  return (
    <AdminContext.Provider
      value={{
        loading: state.loading,
        users: state.users,
        error: state.error,
        currentUser: state.currentUser,
        getUsers,
        register,
        clearUsersFromState,
        clearErrors,
        setLoader,
      }}
    >
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminState;
