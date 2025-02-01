import { ElementCardType } from '@/typedef/typedef';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SelectedToDownloadState {
  list: ElementCardType[];
}

const initialState: SelectedToDownloadState = {
  list: [],
};

const selectedToDownloadSlice = createSlice({
  name: 'selectedToDownload',
  initialState,
  reducers: {
    setSelectedToDownload: (
      state,
      action: PayloadAction<ElementCardType[]>
    ) => {
      state.list = action.payload;
    },
  },
});

export const { setSelectedToDownload } = selectedToDownloadSlice.actions;
export default selectedToDownloadSlice.reducer;
