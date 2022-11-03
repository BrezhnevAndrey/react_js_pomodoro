import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { dateFormat } from "../utilits/dateFormat";

export type TStatisticsState = {
  statistics: Array<TstatisticsElement>;
};

export type TstatisticsElement = {
  date: string;
  value: {
    workingTime: number;
    pauseTime: number;
    pauseCounter: number;
    finishedPomadoro: number;
    activeTaskCounter: number;
    timeoutCounter: number;
  };
};

const counterSlice = createSlice({
  name: "statistics",
  initialState: [
    {
      date: dateFormat,
      value: {
        workingTime: 0,
        pauseTime: 0,
        pauseCounter: 0,
        finishedPomadoro: 0,
        activeTaskCounter: 1,
        timeoutCounter: 1,
      },
    },
  ],

  reducers: {
    pushStatisticsReducer(
      state,
      action: PayloadAction<Array<TstatisticsElement>>
    ) {
      action.payload.map((el) => {
        state.push({
          date: el.date,
          value: {
            workingTime: el.value.workingTime,
            pauseTime: el.value.pauseTime,
            pauseCounter: el.value.pauseCounter,
            finishedPomadoro: el.value.finishedPomadoro,
            activeTaskCounter: el.value.activeTaskCounter,
            timeoutCounter: el.value.timeoutCounter,
          },
        });
      });
    },
    increaseWorkingTime(state) {
      state[state.length - 1].value.workingTime += 1;
    },
    increaseFinishedPomadoro(state) {
      state[state.length - 1].value.finishedPomadoro += 1;
    },
    increasePauseTime(state) {
      state[state.length - 1].value.pauseTime += 1;
    },
    increasePauseCounter(state) {
      state[state.length - 1].value.pauseCounter += 1;
    },
    increaseActiveTaskCounter(state) {
      state[state.length - 1].value.activeTaskCounter += 1;
    },
    increaseTimeoutCounter(state) {
      state[state.length - 1].value.timeoutCounter += 1;
    },
    createStatisticsDate(state, action: PayloadAction<string>) {
      state[0].date = action.payload;
    },
  },
});

export const {
  increasePauseTime,
  increasePauseCounter,
  increaseWorkingTime,
  increaseActiveTaskCounter,
  increaseFinishedPomadoro,
  increaseTimeoutCounter,
  createStatisticsDate,
  pushStatisticsReducer,
} = counterSlice.actions;

export const statisticsReducers = counterSlice.reducer;
