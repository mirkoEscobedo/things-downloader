import { combineReducers } from "@reduxjs/toolkit";
import transformingButtonReducer from './transformingButtonSlice'
import languageReducer from './languageSlice'

const rootReducer = combineReducers({
    isCard: transformingButtonReducer,
    language: languageReducer, 
})

export default rootReducer;