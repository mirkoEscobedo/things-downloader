import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SelectFormatState {
  format: string;
}

const initialState: SelectFormatState = {
  format: '',
};

const selectFormatSlice = createSlice({
  name: 'selectFormat',
  initialState,
  reducers: {
    setFormat: (state, action: PayloadAction<string>) => {
      state.format = action.payload;
    },
  },
});

export const { setFormat } = selectFormatSlice.actions;
export default selectFormatSlice.reducer;
