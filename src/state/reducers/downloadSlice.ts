import { createSlice } from "@reduxjs/toolkit";

interface DownloadState {
  value: boolean;
}

const initialState: DownloadState = {
  value: false,
};

const downloadSlice = createSlice({
  name: "download",
  initialState,
  reducers: {
    setTrue: (state) => {
      state.value = true;
    },
    setFalse: (state) => {
      state.value = false;
    },
  },
});

export const { setTrue, setFalse } = downloadSlice.actions;
export default downloadSlice.reducer;
