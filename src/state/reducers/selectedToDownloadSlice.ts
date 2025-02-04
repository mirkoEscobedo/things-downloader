import { ElementCardType } from "@/typedef/typedef";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SelectedToDownloadState {
  list: ElementCardType[];
  checked: boolean;
}

const initialState: SelectedToDownloadState = {
  list: [],
  checked: false,
};

const selectedToDownloadSlice = createSlice({
  name: "selectedToDownload",
  initialState,
  reducers: {
    resetList: (state) => {
      state.list = [];
    },
    setSelectedToDownload: (
      state,
      action: PayloadAction<{ toDownload: ElementCardType; checked: boolean }>
    ) => {
      const { toDownload, checked } = action.payload;
      if (checked) {
        const inList = state.list.some((card) => card.url === toDownload.url);
        if (!inList) {
          state.list.push(toDownload);
        }
      } else {
        state.list = state.list.filter(
          (card) => card !== action.payload.toDownload
        );
      }
    },
    setChecked: (state, action: PayloadAction<boolean>) => {
      state.checked = action.payload;
    },
  },
});

export const { setSelectedToDownload, resetList, setChecked } =
  selectedToDownloadSlice.actions;
export default selectedToDownloadSlice.reducer;
