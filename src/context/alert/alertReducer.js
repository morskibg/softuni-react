import { SET_ALERT, REMOVE_ALERT } from "../types";

const alertReducer = (state, action) => {
  switch (action.type) {
    case SET_ALERT:
      const rawAlerts = [...state, action.payload];
      // console.log(
      //   "🚀 ~ file: alertReducer.js ~ line 7 ~ alertReducer ~ rawAlerts",
      //   rawAlerts
      // );
      const mustBeFiltered = [
        ...new Map(rawAlerts.map((x) => [x["msg"], x])).values(),
      ];
      // console.log(
      //   "🚀 ~ file: alertReducer.js ~ line 9 ~ alertReducer ~ mustBeFiltered",
      //   mustBeFiltered
      // );
      return mustBeFiltered;
    case REMOVE_ALERT:
      return state.filter((alert) => alert.id !== action.payload);
    default:
      return state;
  }
};
export default alertReducer;
