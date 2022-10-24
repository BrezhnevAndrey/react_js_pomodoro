import { configureStore } from "@reduxjs/toolkit";
import { taskReducers } from "./slice";

export const store = configureStore({
  reducer: {
    tasks: taskReducers,
  },
});
