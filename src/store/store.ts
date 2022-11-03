import { configureStore } from "@reduxjs/toolkit";
import { taskReducers } from "./slice";
import { statisticsReducers } from "./statisticsSlice";
import { timerReducers } from "./timerSlice";

export const store = configureStore({
  reducer: {
    tasks: taskReducers,
    statistics: statisticsReducers,
    timer: timerReducers,
  },
});
