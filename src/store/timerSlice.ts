import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type TTimerState = {
  timer: {
    IsTimeout: boolean;
    IsStarted: boolean;
    IsPaused: boolean;
  };
};

const counterSlice = createSlice({
  name: "timer",
  initialState: {
    IsTimeout: false,
    IsStarted: false,
    IsPaused: false,
  },
  reducers: {
    changeIsTimeout(state, action: PayloadAction<boolean>) {
      state.IsTimeout = action.payload;
    },
    changeIsStarted(state, action: PayloadAction<boolean>) {
      state.IsStarted = action.payload;
    },
    changeIsPaused(state, action: PayloadAction<boolean>) {
      state.IsPaused = action.payload;
    },
  },
});

export const { changeIsTimeout, changeIsStarted, changeIsPaused } =
  counterSlice.actions;

export const timerReducers = counterSlice.reducer;
