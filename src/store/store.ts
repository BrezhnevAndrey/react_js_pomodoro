import { configureStore } from "@reduxjs/toolkit";
import { taskReducers } from "./slice";
import { statisticsReducers } from "./statisticsSlice";
import { timerReducers } from "./timerSlice";
import { userOptionsReducers } from "./userOptionsSlice";

export const store = configureStore({
  reducer: {
    tasks: taskReducers,
    statistics: statisticsReducers,
    timer: timerReducers,
    userOptions: userOptionsReducers,
  },
});
