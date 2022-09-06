import { combineReducers } from "redux";
import chartDataReducer from "./chartDataReducer";

const allReducers = combineReducers({
  chartDataReducer,
});

export default allReducers;
