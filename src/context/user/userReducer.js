import {
  GET_ADDRESSES,
  USER_ERROR,
  CLEAR_ERRORS,
  GET_CONTRACTORS,
} from "../types";

const userReducer = (state, action) => {
  switch (action.type) {
    case GET_ADDRESSES:
      return {
        ...state,
        loading: false,
        addresses: action.payload.sort((a, b) => a.city - b.city),
      };
    case GET_CONTRACTORS:
      return {
        ...state,
        loading: false,
        contractors: action.payload.sort((a, b) => a.name - b.name),
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

    default:
      return state;
  }
};
export default userReducer;
