import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DayNumbers, MonthNumbers, WeekdayNumbers, WeekNumbers } from "luxon";
import { today } from "../utilits/today";
import { test } from "../utilits/today";

const data = test || [
  {
    date: {
      dayName: today.weekdayLong,
      day: today.day,
      month: today.month,
      year: today.year,
      weekNumber: today.weekNumber,
      weekday: today.weekday,
      locale: today.toLocaleString(),
    },
    value: {
      timeToComplite: 0,
      workingTime: 0,
      pauseTime: 0,
      pauseCounter: 0,
      finishedPomadoro: 0,
      activeTaskCounter: 1,
      timeoutCounter: 1,
    },
  },
];

export type TStatisticsState = {
  statistics: {
    activeIndex: number;
    dataset: Array<TstatisticsElement>;
    activeTaskTime: number;
  };
};

export type TDateState = {
  dayName: string;
  day: DayNumbers;
  month: MonthNumbers;
  year: number;
  weekNumber: WeekNumbers;
  weekday: WeekdayNumbers;
  locale: string;
};

export type TstatisticsElement = {
  date: TDateState;
  value: {
    timeToComplite: number;
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
  initialState: {
    activeIndex: today.weekday - 1,
    activeTaskTime: 0,
    dataset: data,
  },

  reducers: {
    pushStatisticsReducer(
      state,
      action: PayloadAction<Array<TstatisticsElement>>
    ) {
      action.payload.map((el) => {
        state.dataset.push({
          date: el.date,
          value: {
            timeToComplite: el.value.timeToComplite,
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
      state.dataset[state.dataset.length - 1].value.workingTime += 1;
    },
    increaseFinishedPomadoro(state) {
      state.dataset[state.dataset.length - 1].value.finishedPomadoro += 1;
    },
    increasePauseTime(state) {
      state.dataset[state.dataset.length - 1].value.pauseTime += 1;
    },
    increasePauseCounter(state) {
      state.dataset[state.dataset.length - 1].value.pauseCounter += 1;
    },
    increaseActiveTaskCounter(state) {
      state.dataset[state.dataset.length - 1].value.activeTaskCounter += 1;
    },
    increaseTimeoutCounter(state) {
      state.dataset[state.dataset.length - 1].value.timeoutCounter += 1;
    },
    incraseActiveTaskTime(state) {
      state.activeTaskTime += 1;
    },
    createStatisticsDate(state, action: PayloadAction<TDateState>) {
      state.dataset[0].date = action.payload;
    },
    changeActiveIndex(state, action: PayloadAction<number>) {
      state.activeIndex = action.payload;
    },
    changeTimeToComplete(state, action: PayloadAction<number>) {
      state.dataset[state.dataset.length - 1].value.timeToComplite +=
        action.payload;
      state.activeTaskTime = 0;
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
  changeActiveIndex,
  changeTimeToComplete,
  incraseActiveTaskTime,
} = counterSlice.actions;

export const statisticsReducers = counterSlice.reducer;
