import { ElementCardType } from "@/typedef/typedef";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SelectedToDownloadState {
  list: ElementCardType[];
}

const initialState: SelectedToDownloadState = {
  list: [],
};

const selectedToDownloadSlice = createSlice({
  name: "selectedToDownload",
  initialState,
  reducers: {
    resetList: (state) => {
      state.list = [];
    },
    addSelectedToDownload: (state, action: PayloadAction<ElementCardType>) => {
      const cardToAdd = action.payload;
      const alreadySelected = state.list.some(
        (Item) => Item.url === cardToAdd.url
      );
      if (!alreadySelected) {
        state.list.push(cardToAdd);
      }
    },
    removeSelectedToDownload: (state, action: PayloadAction<string>) => {
      const urlToRemove = action.payload;
      state.list = state.list.filter((item) => item.url !== urlToRemove);
    },
  },
});

export const { addSelectedToDownload, removeSelectedToDownload, resetList } =
  selectedToDownloadSlice.actions;
export default selectedToDownloadSlice.reducer;
