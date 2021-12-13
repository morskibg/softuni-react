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
  SELECT_CONTRACT,
  CLEAR_CONTRACT,
  DELETE_CONTRACT,
  UPDATE_CONTRACT,
  GET_SPOT_DATA,
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
    spots: [],
    selectedContract: null,
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
        dispatch({
          type: USER_ERROR,
          payload: { alert: { msg: errMsg, type: "danger" } },
        });
      } catch (error) {
        dispatch({
          type: USER_ERROR,
          payload: {
            alert: {
              msg: "Something went wrong. Please try again later.",
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

  //Get Contracts
  const getContracts = async () => {
    setAuthHeader(localStorage.token);
    try {
      const res = await axios.get("contracts");

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
        `utils/stp/${code}?start_date=${startDate}&end_date=${endDate}`
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
      const res = await axios.get("addresses");
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
      const allMetasRes = await axios.get("itn_metas");
      const allItns = allMetasRes.data.map((x) => x.id);
      // let scheduledItns = [];

      if (Object.keys(kwargs).length === 3) {
        const itn = kwargs.itn;
        res = await axios.get(
          `schedules/${itn}?start_date=${startDate}&end_date=${endDate}`
        );
        isFreeItn = res.data.length === 0;
      }
      const scheduledRes = await axios.get(
        `schedules/?startDate=${startDate}&endDate=${endDate}`
      );
      const scheduledItns = scheduledRes.data.map((x) => x.itn);

      const availableItns = allItns.filter((x) => !scheduledItns.includes(x));

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
      const res = await axios.get("contractors");

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
      const res = await axios.post("contracts", alginedInputData, config);

      dispatch({
        type: CREATE_CONTRACT,
        payload: {
          data: res.data,
          alert: { msg: "Contract create successfully", type: "success" },
        },
      });
    } catch (error) {
      errorHandler(error);
    }
  };

  const setSelectedContract = (contract) => {
    dispatch({
      type: SELECT_CONTRACT,
      payload: contract,
    });
  };

  //Delete contract
  const deleteContract = async (contractId) => {
    setAuthHeader(localStorage.token);
    try {
      const res = await axios.delete(`contracts/${contractId}`);

      dispatch({
        type: DELETE_CONTRACT,
        payload: res.data,
      });
    } catch (error) {
      errorHandler(error);
    }
  };

  //Update contract
  const updateContract = async (contract) => {
    setAuthHeader(localStorage.token);

    const updateData = {
      start_date: format(contract.startDate, "yyyy-MM-dd"),
      end_date: format(contract.endDate, "yyyy-MM-dd"),
      id: contract.id,
      contractor_name: contract.name,
      contractor_eik: contract.eik,
      contractor_city: contract.city,
      contractor_postal_code: contract.postalCode,
      contractor_address_line: contract.addressLine,
      price: contract.price,
    };
    console.log(
      "🚀 ~ file: UserState.js ~ line 310 ~ updateContract ~ updateData",
      updateData
    );
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.put(
        `contracts/${contract.id}`,
        updateData,
        config
      );

      dispatch({
        type: UPDATE_CONTRACT,
        payload: {
          data: res.data,
          alert: { msg: "Contract update successfully", type: "success" },
        },
      });
    } catch (error) {
      errorHandler(error);
    }
  };

  const getSpotData = async (sDate, eDate) => {
    setAuthHeader(localStorage.token);
    try {
      const startDate = format(new Date(sDate), "yyyy-MM-dd");
      const endDate = format(new Date(eDate), "yyyy-MM-dd");
      const res = await axios.get(
        `utils/spots?start_date=${startDate}&end_date=${endDate}`
      );
      const dataObj = JSON.parse(res.data[0]["data"]);

      const spots = Object.keys(dataObj).map((idx) => ({
        utc: dataObj[idx]["utc"],
        BG_Pr: dataObj[idx]["BG_Pr"],
        GR_Pr: dataObj[idx]["GR_Pr"],
        RO_Pr: dataObj[idx]["RO_Pr"],
        HU_Pr: dataObj[idx]["HU_Pr"],
        DE_Pr: dataObj[idx]["DE_Pr"],
        eet: dataObj[idx]["eet"],
      }));
      dispatch({
        type: GET_SPOT_DATA,
        payload: spots,
      });
    } catch (error) {
      errorHandler(error);
    }
  };

  const clearErrors = () => dispatch({ type: CLEAR_ERRORS });
  const startLoader = () => dispatch({ type: START_LOADER });
  const clearStp = () => dispatch({ type: CLEAR_STP });
  const clearSelectedContract = () => dispatch({ type: CLEAR_CONTRACT });

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
        avgMonthlyStpWeekEnd: state.avgMonthlyStpWeekEnd,
        selectedContract: state.selectedContract,
        spots: state.spots,
        getAddresses,
        getContracts,
        getContractors,
        clearErrors,
        createContract,
        startLoader,
        getAvlItns,
        getStpCoeffs,
        clearStp,
        setSelectedContract,
        clearSelectedContract,
        deleteContract,
        updateContract,
        getSpotData,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
