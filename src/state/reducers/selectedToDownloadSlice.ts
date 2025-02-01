import { ElementCardType } from '@/typedef/typedef';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SelectedToDownloadState {
  list: ElementCardType[];
  checked: boolean;
}

const initialState: SelectedToDownloadState = {
  list: [],
  checked: false,
};

const selectedToDownloadSlice = createSlice({
  name: 'selectedToDownload',
  initialState,
  reducers: {
    resetList: (state) => {
      state.list = [];
    },
    setSelectedToDownload: (
      state,
      action: PayloadAction<{ toDownload: ElementCardType; checked: boolean }>
    ) => {
      if (state.checked) {
        state.list = [...state.list, action.payload.toDownload];
      }
      state.list.filter((card) => card !== action.payload.toDownload);
    },
  },
});

export const { setSelectedToDownload, resetList } =
  selectedToDownloadSlice.actions;
export default selectedToDownloadSlice.reducer;
