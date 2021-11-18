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
} from "../types";

const AdminState = (props) => {
  const initialState = {
    token: localStorage.getItem("token"),
    users: [],
    currentUser: null,
    loading: true,
    error: null,
  };
  // console.log("in Auth State");
  const [state, dispatch] = useReducer(adminReducer, initialState);

  const getUsers = async () => {
    setAuthHeader(localStorage.token);
    try {
      const res = await axios.get("/api/v1/users");
      console.log("🚀 ~ file: AdminState.js ~ line 34 ~ getUsers ~ res", res);

      dispatch({
        type: USERS_LOADED,
        payload: res.data,
      });
    } catch (err) {
      console.log("🚀 ~ file: AdminState.js ~ line 41 ~ getUsers ~ err", err);
      let errMsg = err;
      try {
        errMsg = Array.isArray(err.response.data.detail)
          ? err.response.data.detail[0]["msg"]
          : err.response.data.detail;
      } catch (error) {
        console.log(
          "🚀 ~ file: AdminState.js ~ line 48 ~ getUsers ~ error",
          error
        );
      }

      dispatch({ type: ADMIN_ERROR, payload: errMsg });
    }
  };

  return (
    <AdminContext.Provider
      value={{
        loading: state.loading,
        users: state.users,
        error: state.error,
        currentUser: state.currentUser,
        getUsers,
      }}
    >
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminState;
