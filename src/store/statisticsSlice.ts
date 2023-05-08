import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { today } from "../utilits/today";

export const dataToday: Array<TstatisticsElement> = [
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
    id: 0,
  },
];

export type TStatisticsState = {
  statistics: {
    activeElement: TstatisticsElement;
    dataset: Array<TstatisticsElement>;
    activeTaskTime: number;
  };
};

export type TDateState = {
  dayName: string | null;
  day: number;
  month: number;
  year: number;
  weekNumber: number;
  weekday: number;
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
  id: number;
};

const counterSlice = createSlice({
  name: "statistics",
  initialState: {
    activeElement: dataToday[0],
    activeTaskTime: 0,
    dataset: dataToday,
  },

  reducers: {
    pushStatisticsReducer(
      state,
      action: PayloadAction<Array<TstatisticsElement>>
    ) {
      const arrayOfData = action.payload;
      arrayOfData.sort((a, b) => {
        if (a.date.weekNumber > b.date.weekNumber) return 1;
        if (a.date.weekNumber < b.date.weekNumber) return -1;
        else {
          if (a.date.weekday > b.date.weekday) return 1;
          if (a.date.weekday < b.date.weekday) return -1;
          else return 0;
        }
      });
      if (
        arrayOfData[arrayOfData.length - 1].date.locale ===
        today.toLocaleString()
      ) {
        state.dataset.splice(state.dataset.length - 1, 1);
      }
      arrayOfData.reverse().map((el) => {
        if (Number(el.date.weekNumber) >= Number(today.weekNumber - 2))
          state.dataset.unshift({
            date: el.date,
            value: el.value,
            id: el.id,
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
    changeActiveIndex(state, action: PayloadAction<TstatisticsElement>) {
      state.activeElement = action.payload;
    },
    changeTimeToComplete(state, action: PayloadAction<number>) {
      state.dataset[state.dataset.length - 1].value.timeToComplite +=
        action.payload;
      state.activeTaskTime = 0;
    },
    changeElementsId(state, action: PayloadAction<number>) {
      state.dataset[state.dataset.length - 1].id = action.payload;
    },
    testDataset(state, action: PayloadAction<any>) {
      state.dataset = action.payload
    }
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
  changeElementsId,
  testDataset,
} = counterSlice.actions;

export const statisticsReducers = counterSlice.reducer;
