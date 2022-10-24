import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const date = new Date();
const dateFormat =
  date.getFullYear() + " " + date.getMonth() + " " + date.getDate();

export type TInitialState = {
  tasks: {
    inputValue: string;
    statistics: Array<TStatisticsState>;
    tasks: Array<TTaskState>;
  };
};

export type TStatisticsState = {
  date: Date;
  value: {
    pauseTime: number;
    pauseCounter: number;
    finishedPomadoro: number;
  };
};

export type TTaskState = {
  taskName: string;
  amount: number;
  timeLeft: number;
};

const counterSlice = createSlice({
  name: "task",
  initialState: {
    inputValue: "",
    statistics: [
      {
        date: dateFormat,
        value: { pauseTime: 0, pauseCounter: 0, finishedPomadoro: 0 },
      },
    ],
    tasks: [
      {
        taskName: "Нет задач",
        amount: 0,
        timeLeft: 0,
      },
    ],
  },
  reducers: {
    inputValue(state, action: PayloadAction<string>) {
      state.inputValue = action.payload;
    },
    pushTasksReducer(state, action: PayloadAction<Array<TTaskState>>) {
      action.payload.map((el) => {
        state.tasks.push({
          taskName: el.taskName,
          amount: el.amount,
          timeLeft: el.timeLeft,
        });
      });
    },
    deleteTasksReducer(state, action: PayloadAction<number>) {
      state.tasks.splice(action.payload, 1);
    },
    changeTasksReducer(
      state,
      action: PayloadAction<[number, number | string]>
    ) {
      if (typeof action.payload[1] === "number")
        state.tasks[action.payload[0]].amount = action.payload[1];
      if (typeof action.payload[1] === "string")
        state.tasks[action.payload[0]].taskName = action.payload[1];
    },
    changeActiveTaskTimeLeft(state, action: PayloadAction<number>) {
      state.tasks[1] && (state.tasks[1].timeLeft += action.payload);
    },
    resetActiveTaskTimeLeft(state) {
      state.tasks[1] && (state.tasks[1].timeLeft = 1500);
    },
    increasePauseTime(state, action: PayloadAction<number>) {
      state.statistics[0].value.pauseTime += action.payload;
    },
    increasePauseCounter(state) {
      state.statistics[0].value.pauseCounter += 1;
    },
    createStatisticsDate(state, action: PayloadAction<string>) {
      state.statistics[0].date = action.payload;
    },
  },
});

export const {
  inputValue,
  pushTasksReducer,
  deleteTasksReducer,
  changeTasksReducer,
  changeActiveTaskTimeLeft,
  resetActiveTaskTimeLeft,
  increasePauseTime,
  increasePauseCounter,
  createStatisticsDate,
} = counterSlice.actions;

export const taskReducers = counterSlice.reducer;
