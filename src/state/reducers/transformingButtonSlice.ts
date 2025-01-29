import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface TransformingButtonState {
    value: boolean;
}

const initialState: TransformingButtonState = {
    value: false,
}

const transformingButtonSlice = createSlice({
    name:'isCard',
    initialState,
    reducers: {
        toggle: (state) => {state.value = !state.value},
        cardTrue: (state) => {state.value = true},
        cardFalse: (state) => {state.value = false},
    }
})

export const {toggle, cardTrue, cardFalse,} = transformingButtonSlice.actions;
export const selectIsCard = (state:RootState) => state.isCard.value;
export default transformingButtonSlice.reducer;