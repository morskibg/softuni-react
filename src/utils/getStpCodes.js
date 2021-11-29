import React, { useState, useContext, useEffect, Fragment } from "react";
import axios from "axios";
// import AlertContext from "../../../context/alert/alertContext";
import setAuthHeader from "./setAuthHeader";

// const alertContext = useContext(AlertContext);
// const { setAlert } = alertContext;

const getStpCodes = async () => {
  setAuthHeader(localStorage.token);
  try {
    const res = await axios.get("/api/v1/utils/stp-codes");
    return res;
  } catch (err) {
    let errMsg = err;
    try {
      errMsg = Array.isArray(err.response.data.detail)
        ? err.response.data.detail[0]["msg"]
        : err.response.data.detail;
    } catch (error) {
      console.log(
        "🚀 ~ file: getStpCodes.js ~ line 21 ~ getStpCodes ~ error",
        error
      );
    }
    console.log(errMsg);
  }
};
export default getStpCodes;
