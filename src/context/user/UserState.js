import React, { useReducer } from "react";
import axios from "axios";
import UserContext from "./userContext";
import userReducer from "./userReducer";
import setAuthHeader from "../../utils/setAuthHeader";
import {
  GET_ADDRESSES,
  USER_ERROR,
  CLEAR_ERRORS,
  GET_CONTRACTORS,
} from "../types";

const UserState = (props) => {
  const initialState = {
    loading: false,
    addresses: [],
    contractors: [],
    error: null,
  };

  const [state, dispatch] = useReducer(userReducer, initialState);

  // Get all addresses
  const getAddresses = async () => {
    setAuthHeader(localStorage.token);
    try {
      const res = await axios.get("/api/v1/addresses");

      dispatch({
        type: GET_ADDRESSES,
        payload: res.data,
      });
    } catch (err) {
      let errMsg = err;
      try {
        errMsg = Array.isArray(err.response.data.detail)
          ? err.response.data.detail[0]["msg"]
          : err.response.data.detail;
      } catch (error) {
        dispatch({
          type: USER_ERROR,
          payload: { alert: { msg: errMsg, type: "danger" } },
        });
      }
    }
  };

  // Get all companies
  const getContractors = async () => {
    setAuthHeader(localStorage.token);
    try {
      const res = await axios.get("/api/v1/contractors");

      dispatch({
        type: GET_CONTRACTORS,
        payload: res.data,
      });
    } catch (err) {
      let errMsg = err;
      try {
        errMsg = Array.isArray(err.response.data.detail)
          ? err.response.data.detail[0]["msg"]
          : err.response.data.detail;
      } catch (error) {
        dispatch({
          type: USER_ERROR,
          payload: { alert: { msg: errMsg, type: "danger" } },
        });
      }
    }
  };

  const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

  return (
    <UserContext.Provider
      value={{
        loading: state.loading,
        addresses: state.addresses,
        contractors: state.contractors,
        error: state.error,

        getAddresses,
        getContractors,
        clearErrors,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
