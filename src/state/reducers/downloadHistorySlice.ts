import { ElementCardType } from "@/typedef/typedef";
import { getDownloadHistory } from "@/utils/downloadHistory";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DownloadHistroyState {
    value: ElementCardType[];
}

const initialState: DownloadHistroyState ={
    value: getDownloadHistory()
} 

const downloadHistorySlice = createSlice({
    name: 'downloadHistory',
    initialState,
    reducers: {
        setDownloadHistory: ((state, action:PayloadAction<ElementCardType[]>) => {state.value = action.payload}),
    }
})

export const {setDownloadHistory} = downloadHistorySlice.actions;
export default downloadHistorySlice.reducer;