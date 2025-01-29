import { ElementCardType } from "@/typedef/typedef";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DownloadCardListState {
  value: ElementCardType[];
}

const initialState: DownloadCardListState = {
  value: [],
};

const downloadCardLIstSlice = createSlice({
  name: "downlaodCardList",
  initialState,
  reducers: {
    setDownloadCardList: (state, action: PayloadAction<ElementCardType[]>) => {
      state.value = action.payload;
    },
  },
});

export const { setDownloadCardList } = downloadCardLIstSlice.actions;
export default downloadCardLIstSlice.reducer;
