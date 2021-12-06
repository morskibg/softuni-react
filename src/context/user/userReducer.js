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
} from "../types";

const userReducer = (state, action) => {
  switch (action.type) {
    case AUTH_ERROR:
      localStorage.removeItem("token");
      return {
        ...state,
        loading: false,
      };
    case GET_ADDRESSES:
      return {
        ...state,
        loading: false,
        addresses: action.payload.sort((a, b) => a.city - b.city),
      };
    case GET_AVL_ITNS:
      console.log("in available ", action.payload);

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
        stpCoeffs: action.payload,
      };
    case GET_CONTRACTORS:
      return {
        ...state,
        loading: false,
        contractors: action.payload.sort((a, b) => a.name - b.name),
      };
    case CREATE_CONTRACT:
      console.log(
        "🚀 ~ file: userReducer.js ~ line 27 ~ userReducer ~ action.payload.alert",
        action.payload.alert
      );
      return {
        ...state,
        error: action.payload.alert,
        loading: false,
        // addresses: action.payload.sort((a, b) => a.city - b.city),
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
