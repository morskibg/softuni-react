import React, { useReducer } from "react";
import axios from "axios";
import UserContext from "./userContext";
import userReducer from "./userReducer";
import setAuthHeader from "../../utils/setAuthHeader";
import { format } from "date-fns";
import {
  GET_ADDRESSES,
  USER_ERROR,
  CLEAR_ERRORS,
  GET_CONTRACTORS,
  CREATE_CONTRACT,
  START_LOADER,
  GET_AVL_ITNS,
  GET_STP,
  AUTH_ERROR,
  CLEAR_STP,
  GET_CONTRACTS,
} from "../types";

const UserState = (props) => {
  const initialState = {
    loading: false,
    addresses: [],
    contractors: [],
    availableITNs: [],
    contracts: [],
    stpCoeffs: [],
    avgMonthlyStp: [],
    avgMonthlyStpWeekEnd: [],
    isFreeItn: true,
    error: null,
  };

  const [state, dispatch] = useReducer(userReducer, initialState);

  const errorHandler = (error) => {
    if (error.response) {
      // Request made and server responded
      if (error.response.status === 403 || error.response.status === 401) {
        // console.log("auth from USER STATE error DELETING TOKEN");
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
          type: USER_ERROR,
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

  //Get Contracts
  const getContracts = async () => {
    setAuthHeader(localStorage.token);
    try {
      const res = await axios.get("/api/v1/contracts");
      console.log("from getContracts", res);
      dispatch({
        type: GET_CONTRACTS,
        payload: res.data,
      });
    } catch (error) {
      errorHandler(error);
    }
  };

  // Get stp coeffs
  const getStpCoeffs = async (code, startDate, endDate) => {
    setAuthHeader(localStorage.token);
    try {
      const res = await axios.get(
        `/api/v1/utils/stp/${code}?start_date=${startDate}&end_date=${endDate}`
      );
      // console.log(
      //   "🚀 ~ file: UserState.js ~ line 71 ~ getStpCoeffs ~ res",
      //   res
      // );

      const dataObj = JSON.parse(res.data[0][code]);

      const wholePeriodData = Object.keys(dataObj).map((idx) => ({
        utc: dataObj[idx]["utc"],
        FullPeriod: dataObj[idx]["value"],
        eet: dataObj[idx]["eet"],
      }));
      // console.log(
      //   "🚀 ~ file: UserState.js ~ line 84 ~ wholePeriodData ~ wholePeriodData",
      //   wholePeriodData
      // );

      const dataObjM = JSON.parse(res.data[1][Object.keys(res.data[1])[0]]);

      const monthlyAgrrWorkDays = Object.keys(dataObjM).map((idx) => ({
        hour: dataObjM[idx]["hour"],
        MonthlyAggregationWorkDays: dataObjM[idx]["value"],
      }));

      const dataObjMWeekend = JSON.parse(
        res.data[2][Object.keys(res.data[2])[0]]
      );

      const monthlyAgrrWeekDays = Object.keys(dataObjMWeekend).map((idx) => ({
        hour: dataObjMWeekend[idx]["hour"],
        MonthlyAggregationWeekDays: dataObjMWeekend[idx]["value"],
      }));

      dispatch({
        type: GET_STP,
        payload: { wholePeriodData, monthlyAgrrWorkDays, monthlyAgrrWeekDays },
      });
    } catch (error) {
      errorHandler(error);
    }
  };

  // Get all addresses
  const getAddresses = async () => {
    setAuthHeader(localStorage.token);
    try {
      const res = await axios.get("/api/v1/addresses");
      // console.log("from setAuthHeader", res);
      dispatch({
        type: GET_ADDRESSES,
        payload: res.data,
      });
    } catch (error) {
      errorHandler(error);
    }
  };
  // Get available itns
  const getAvlItns = async (kwargs) => {
    // console.log(
    //   "🚀 ~ file: UserState.js ~ line 91 ~ getAvlItns ~ kwargs",
    //   kwargs
    // );
    setAuthHeader(localStorage.token);
    var res = "";
    var isFreeItn = true;
    try {
      const startDate = kwargs.startDate;
      const endDate = kwargs.endDate;
      const allMetasRes = await axios.get("/api/v1/itn_metas");
      const allItns = allMetasRes.data.map((x) => x.id);
      // let scheduledItns = [];

      if (Object.keys(kwargs).length === 3) {
        const itn = kwargs.itn;
        res = await axios.get(
          `/api/v1/schedules/${itn}?start_date=${startDate}&end_date=${endDate}`
        );
        isFreeItn = res.data.length === 0;
        // console.log(
        //   "🚀 ~ AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
        //   res.data.length
        // );
      }
      const scheduledRes = await axios.get(
        `/api/v1/schedules/?startDate=${startDate}&endDate=${endDate}`
      );
      const scheduledItns = scheduledRes.data.map((x) => x.itn);

      // console.log(
      //   "🚀 ~ file: UserState.js ~ line 160 ~ getAvlItns ~ scheduledItns",
      //   scheduledItns
      // );
      const availableItns = allItns.filter((x) => !scheduledItns.includes(x));
      // console.log(
      //   "🚀 ~ file: UserState.js ~ line 113 ~ getAvlItns ~ availableItns",
      //   availableItns
      // );
      // console.log(
      //   "🚀 ~ file: UserState.js ~ line 149 ~ getAvlItns ~ isFreeItn",
      //   isFreeItn
      // );

      dispatch({
        type: GET_AVL_ITNS,
        payload: { availableItns, isFreeItn },
      });
    } catch (error) {
      errorHandler(error);
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
    } catch (error) {
      errorHandler(error);
    }
  };

  const createContract = async (formData) => {
    setAuthHeader(localStorage.token);
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const alginedInputData = {
        price: formData.price,
        start_date: `${format(new Date(formData.startDate), "yyyy-MM-dd")}`,
        end_date: `${format(new Date(formData.endDate), "yyyy-MM-dd")}`,
        contractor_name: formData.name,
        contractor_eik: formData.eik,
        contractor_city: formData.city,
        contractor_postal_code: formData.postalCode,
        contractor_address_line: formData.addressLine,
        itn: formData.itn,
        erp: formData.erp,
        load_type: formData.loadType,
        itn_city: formData.cityITN,
        itn_postal_code: formData.postalCodeITN,
        itn_address_line: formData.addressLineITN,
      };
      const res = await axios.post(
        "/api/v1/contracts",
        alginedInputData,
        config
      );

      dispatch({
        type: CREATE_CONTRACT,
        payload: {
          data: res.data,
          alert: { msg: "Contract create successfully", type: "success" },
        },
      });

      // dispatch({
      //   type: CREATE_CONTRACT,
      //   payload: res.data,
      // });
    } catch (error) {
      errorHandler(error);
    }
  };

  const clearErrors = () => dispatch({ type: CLEAR_ERRORS });
  const startLoader = () => dispatch({ type: START_LOADER });
  const clearStp = () => dispatch({ type: CLEAR_STP });

  return (
    <UserContext.Provider
      value={{
        loading: state.loading,
        addresses: state.addresses,
        contractors: state.contractors,
        contracts: state.contracts,
        error: state.error,
        availableITNs: state.availableITNs,
        stpCoeffs: state.stpCoeffs,
        isFreeItn: state.isFreeItn,
        avgMonthlyStp: state.avgMonthlyStp,
        // monthlyAgrrWorkDays: state.monthlyAgrrWorkDays,
        avgMonthlyStpWeekEnd: state.avgMonthlyStpWeekEnd,
        getAddresses,
        getContracts,
        getContractors,
        clearErrors,
        createContract,
        startLoader,
        getAvlItns,
        getStpCoeffs,
        clearStp,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
