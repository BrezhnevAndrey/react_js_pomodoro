import { createSlice, configureStore } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "task",
  initialState: {
    value: "",
  },
  reducers: {
    taskReducer: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { taskReducer } = counterSlice.actions;

export const store = configureStore({
  reducer: counterSlice.reducer,
});
