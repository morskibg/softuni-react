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
} from "../types";

const userReducer = (state, action) => {
  // console.log(
  //   "🚀 ~ file: userReducer.js ~ line 18 ~ userReducer ~ action",
  //   action.type
  // );
  switch (action.type) {
    case AUTH_ERROR:
      //console.log("in user AUTH ERROR reducer ---> ", action.payload);
      localStorage.removeItem("token");
      return {
        ...state,
        loading: false,
        error: action.payload.alert,
      };
    case GET_ADDRESSES:
      return {
        ...state,
        loading: false,
        addresses: action.payload.sort((a, b) => a.city - b.city),
      };
    case GET_CONTRACTS:
      return {
        ...state,
        loading: false,
        contracts: action.payload.sort(
          (a, b) => a.contractor.name - b.contractor.name
        ),
      };
    case GET_AVL_ITNS:
      //console.log("in available ", action.payload);

      return {
        ...state,
        loading: false,
        availableITNs: action.payload.availableItns,
        isFreeItn: action.payload.isFreeItn,
      };
    case GET_STP:
      return {
        ...state,
        loading: false,
        stpCoeffs: action.payload.wholePeriodData,
        avgMonthlyStp: action.payload.monthlyAgrrWorkDays,
        avgMonthlyStpWeekEnd: action.payload.monthlyAgrrWeekDays,
      };
    case GET_CONTRACTORS:
      return {
        ...state,
        loading: false,
        contractors: action.payload.sort((a, b) => a.name - b.name),
      };
    case CREATE_CONTRACT:
      return {
        ...state,
        error: action.payload.alert,
        loading: false,
        // addresses: action.payload.sort((a, b) => a.city - b.city),
      };
    case SELECT_CONTRACT:
      return {
        ...state,
        selectedContract: action.payload,
      };
    case DELETE_CONTRACT:
      return {
        ...state,
        contracts: state.contracts.filter((x) => x.id !== action.payload.id),
      };
    case USER_ERROR:
      return {
        ...state,
        error: action.payload.alert,
        addresses: [],
        loading: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    case CLEAR_CONTRACT:
      return {
        ...state,
        selectedContract: null,
      };
    case CLEAR_STP:
      return {
        ...state,
        stpCoeffs: [],
        avgMonthlyStp: [],
        avgMonthlyStpWeekEnd: [],
      };
    case START_LOADER:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};
export default userReducer;
