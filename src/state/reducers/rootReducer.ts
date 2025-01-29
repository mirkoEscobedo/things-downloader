import { combineReducers } from "@reduxjs/toolkit";
import transformingButtonReducer from "./transformingButtonSlice";
import languageReducer from "./languageSlice";
import downloadHistoryReducer from "./downloadHistorySlice";
import downloadCardListReducer from "./downloadCardListSlice";
import downloadReducer from "./downloadSlice";

const rootReducer = combineReducers({
  isCard: transformingButtonReducer,
  language: languageReducer,
  downloadHistory: downloadHistoryReducer,
  downloadCardList: downloadCardListReducer,
  download: downloadReducer,
});

export default rootReducer;
