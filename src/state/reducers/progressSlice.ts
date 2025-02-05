import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProgressState {
  isDownloading: boolean;
  progress: number;
  status: string;
}

const initialState: ProgressState = {
  isDownloading: false,
  progress: 0,
  status: "Pending",
};

export const progressSlice = createSlice({
  name: "downloadProgress",
  initialState,
  reducers: {
    startDownloadProgress: (state) => {
      state.isDownloading = true;
      state.status = "Downloading";
      state.progress = 0;
    },
    updateProgressProgress: (
      state,
      action: PayloadAction<{ status: string; progress: number }>
    ) => {
      const { status, progress } = action.payload;
      state.progress = progress;
      state.status = status;
    },
    finishDownloadProgress: (state) => {
      state.isDownloading = false;
      state.progress = 100;
      state.status = "Finished";
    },
    resetDownloadProgress: (state) => {
      state.isDownloading = false;
      state.progress = 0;
      state.status = "Pending";
    },
  },
});

export const {
  startDownloadProgress,
  updateProgressProgress,
  finishDownloadProgress,
  resetDownloadProgress,
} = progressSlice.actions;

export default progressSlice.reducer;
