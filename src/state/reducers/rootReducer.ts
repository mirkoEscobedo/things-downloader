import { combineReducers } from "@reduxjs/toolkit";
import transformingButtonReducer from './transformingButtonSlice'
const rootReducer = combineReducers({
    isCard: transformingButtonReducer,
})

export default rootReducer;