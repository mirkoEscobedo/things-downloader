import { combineReducers } from "@reduxjs/toolkit";
import transformingButtonReducer from "./transformingButtonSlice";
import languageReducer from "./languageSlice";
import downloadHistoryReducer from "./downloadHistorySlice";
import downloadCardListReducer from "./downloadCardListSlice";
import downloadReducer from "./downloadSlice";
import selectedToDownloadReducer from "./selectedToDownloadSlice";
import selectFormatReducer from "./selectFormatSlice";
import downloadProgressReducer from "./progressSlice";

const rootReducer = combineReducers({
  isCard: transformingButtonReducer,
  language: languageReducer,
  downloadHistory: downloadHistoryReducer,
  downloadCardList: downloadCardListReducer,
  download: downloadReducer,
  selectToDownload: selectedToDownloadReducer,
  downloadProgress: downloadProgressReducer,
  selectFormat: selectFormatReducer,
});

export default rootReducer;
