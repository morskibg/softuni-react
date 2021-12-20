import React, { useReducer, useContext, useEffect } from "react";
import axios from "axios";
import AdminContext from "./adminContext";
import adminReducer from "./adminReducer";
import AuthContext from "../../context/auth/authContext";
import setAuthHeader from "../../utils/setAuthHeader";
import useLocalStorage from "../../hooks/useLocalStorage";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  SET_CURRENT_USER,
  CLEAR_ERRORS,
  USERS_LOADED,
  ADMIN_ERROR,
  CLEAR_USERS,
  START_LOADER,
  DELETE_USER,
  CLEAR_CURRENT_USER,
  SET_MODIFIER,
  CLEAR_MODIFIER,
  UPDATE_USER,
  AUTH_ERROR,
} from "../types";

const AdminState = (props) => {
  const initialState = {
    token: localStorage.getItem("token"),
    users: [],
    currentUser: null,
    loading: false,
    error: null,
    isModified: false,
  };

  const [state, dispatch] = useReducer(adminReducer, initialState);

  const authContext = useContext(AuthContext);
  const { verifyToken } = authContext;

  const errorHandler = (error, reducerType) => {
    verifyToken();
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

  // Register User
  const registerUser = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post("users", formData, config);

      dispatch({
        type: REGISTER_SUCCESS,
        payload: {
          data: res.data,
          alert: { msg: "User create successfully", type: "success" },
        },
      });

      // loadUser();
    } catch (err) {
      errorHandler(err, REGISTER_FAIL);
      // // console.log("🚀 ~ file: AuthState.js ~ line 68 ~ register ~ err", err);
      // // console.log(err.response);
      // // console.log(err.response.data);
      // // console.log(err.response.data.detail[0]["msg"]);
      // // console.log(err.response.data.detail.isArray);
      // const errMsg = Array.isArray(err.response.data.detail)
      //   ? err.response.data.detail[0]["msg"]
      //   : err.response.data.detail;

      // // console.log(
      // //   "🚀 ~ file: AdminState.js ~ line 59 ~ register ~ errMsg",
      // //   errMsg
      // // );
      // dispatch({
      //   type: REGISTER_FAIL,
      //   payload: { alert: { msg: errMsg, type: "danger" } },
      // });
    }
  };

  //Load all users
  const getUsers = async () => {
    setAuthHeader(localStorage.token);
    try {
      const res = await axios.get("users");

      dispatch({
        type: USERS_LOADED,
        payload: res.data,
      });
    } catch (err) {
      errorHandler(err, ADMIN_ERROR);
      // let errMsg = err;
      // try {
      //   errMsg = Array.isArray(err.response.data.detail)
      //     ? err.response.data.detail[0]["msg"]
      //     : err.response.data.detail;
      // } catch (error) {
      //   dispatch({
      //     type: ADMIN_ERROR,
      //     payload: { alert: { msg: errMsg, type: "danger" } },
      //   });
      // }
    }
  };

  const deleteUser = async (email) => {
    setAuthHeader(localStorage.token);
    try {
      const res = await axios.delete(`users/${email}`);

      dispatch({
        type: DELETE_USER,
        payload: res.data,
      });
    } catch (err) {
      errorHandler(err, ADMIN_ERROR);
      // let errMsg = err;
      // try {
      //   errMsg = Array.isArray(err.response.data.detail)
      //     ? err.response.data.detail[0]["msg"]
      //     : err.response.data.detail;
      // } catch (error) {
      //   dispatch({
      //     type: ADMIN_ERROR,
      //     payload: { alert: { msg: errMsg, type: "danger" } },
      //   });
      // }
    }
  };

  const modifyUser = async (userData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const userId = Number(userData.id);
    delete userData.id;

    setAuthHeader(localStorage.token);
    try {
      // console.log(
      //   "🚀 ~ file: AdminState.js ~ line 138 ~ modifyUser ~ userData",
      //   userData
      // );
      const res = await axios.put(`users/${userId}`, userData, config);

      dispatch({
        type: UPDATE_USER,
        payload: {
          data: res.data,
          alert: { msg: "User update successfully", type: "success" },
        },
      });
    } catch (err) {
      errorHandler(err, ADMIN_ERROR);
      // // console.log(
      // //   "🚀 ~ file: AdminState.js ~ line 145 ~ modifyUser ~ err",
      // //   err
      // // );
      // let errMsg = err;
      // try {
      //   errMsg = Array.isArray(err.response.data.detail)
      //     ? err.response.data.detail[0]["msg"]
      //     : err.response.data.detail;
      // } catch (error) {
      //   // console.log(
      //   //   "🚀 ~ file: AdminState.js ~ line 48 ~ getUsers ~ error",
      //   //   error
      //   // );
      // }

      // dispatch({
      //   type: ADMIN_ERROR,
      //   payload: { alert: { msg: errMsg, type: "danger" } },
      // });
    }
  };

  const setCurrentUser = (user) => {
    dispatch({
      type: SET_CURRENT_USER,
      payload: user,
    });
  };

  const clearCurrUser = () => {
    dispatch({ type: CLEAR_CURRENT_USER });
  };

  const clearUsersFromState = () => {
    // console.log("in clearUsersFromState");
    dispatch({ type: CLEAR_USERS });
  };

  const clearErrors = () => dispatch({ type: CLEAR_ERRORS });
  const setLoader = () => dispatch({ type: START_LOADER });

  const setModifier = () => dispatch({ type: SET_MODIFIER });
  const clearModifier = () => dispatch({ type: CLEAR_MODIFIER });

  return (
    <AdminContext.Provider
      value={{
        loading: state.loading,
        users: state.users,
        error: state.error,
        currentUser: state.currentUser,
        isModified: state.isModified,
        getUsers,
        registerUser,
        clearUsersFromState,
        clearErrors,
        setLoader,
        deleteUser,
        setCurrentUser,
        clearCurrUser,
        setModifier,
        clearModifier,
        modifyUser,
      }}
    >
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminState;
