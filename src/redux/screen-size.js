import { createSlice } from "@reduxjs/toolkit";

export const screenSizeSlice = createSlice({
  name: "screenSize",
  initialState: {
    innerHeight: 600,
    innerWidth: 900,
  },
  reducers: {
    updateScreen: (state, action) => {
      state.innerHeight = action.payload.innerHeight;
      state.innerWidth = action.payload.innerWidth;

      return state;
    },
  },
});

export const { updateScreen } = screenSizeSlice.actions;
export const selectInnerHeight = (state) => state.screenSize.innerHeight;
export const selectInnerWidth = (state) => state.screenSize.innerWidth;
export default screenSizeSlice.reducer;
