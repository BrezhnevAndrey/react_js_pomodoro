import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IUserOptions {
  userOptions: {
    pomadoroDuration: number;
    shortTimeoutDuration: number;
    longTimeoutDuration: number;
    longTimeoutFrequency: number;
    IsSoundNotification: boolean;
    IsBlackTheme: boolean;
  };
}

const userOptionsSlice = createSlice({
  name: "userOptions",
  initialState: {
    pomadoroDuration: 1500,
    shortTimeoutDuration: 300,
    longTimeoutDuration: 900,
    longTimeoutFrequency: 4,
    IsSoundNotification: true,
    IsBlackTheme: false,
  },
  reducers: {
    changePomadoroDuration(state, action: PayloadAction<number>) {
      state.pomadoroDuration = action.payload;
    },
    changeShortTimeoutDuration(state, action: PayloadAction<number>) {
      state.shortTimeoutDuration = action.payload;
    },
    changeLongTimeoutDuration(state, action: PayloadAction<number>) {
      state.longTimeoutDuration = action.payload;
    },
    changeLongTimeoutFrequency(state, action: PayloadAction<number>) {
      state.longTimeoutFrequency = action.payload;
    },
    changeIsSoundNotification(state, action: PayloadAction<boolean>) {
      state.IsSoundNotification = action.payload;
    },
    changeIsBlackTheme(state, action: PayloadAction<boolean>) {
      state.IsBlackTheme = action.payload;
    },
  },
});

export const {
  changePomadoroDuration,
  changeShortTimeoutDuration,
  changeLongTimeoutDuration,
  changeLongTimeoutFrequency,
  changeIsSoundNotification,
  changeIsBlackTheme,
} = userOptionsSlice.actions;

export const userOptionsReducers = userOptionsSlice.reducer;
