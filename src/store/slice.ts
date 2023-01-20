import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type TInitialState = {
  tasks: {
    inputValue: string;
    defaultTime: number;
    timeoutTimeLeft: number;
    tasks: Array<TTaskState>;
    statisticsWeekAgo: 0 | 1 | 2;
  };
};

export type TTaskState = {
  taskName: string;
  amount: number;
  timeLeft: number;
  pomadoroCounter: number;
};

export const emptyTask: TTaskState = {
  taskName: "Нет задач",
  amount: 0,
  timeLeft: 0,
  pomadoroCounter: 1,
};

const counterSlice = createSlice({
  name: "task",
  initialState: {
    inputValue: "",
    defaultTime: 1500,
    timeoutTimeLeft: 0,
    statisticsWeekAgo: 0,
    tasks: [emptyTask],
  },
  reducers: {
    inputValue(state, action: PayloadAction<string>) {
      state.inputValue = action.payload;
    },
    pushTasksReducer(state, action: PayloadAction<Array<TTaskState>>) {
      if (!action.payload) return;
      action.payload.map((el) => {
        state.tasks.push({
          taskName: el.taskName,
          amount: el.amount,
          timeLeft: el.timeLeft,
          pomadoroCounter: el.pomadoroCounter,
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
        state.tasks[action.payload[0]].amount += action.payload[1];
      if (typeof action.payload[1] === "string")
        state.tasks[action.payload[0]].taskName = action.payload[1];
    },
    changeActiveTaskTimeLeft(state, action: PayloadAction<number>) {
      state.tasks[1] && (state.tasks[1].timeLeft += action.payload);
    },
    resetActiveTaskTimeLeft(state, action: PayloadAction<number>) {
      state.tasks[1] &&
        (action
          ? (state.tasks[1].timeLeft = action.payload)
          : (state.tasks[1].timeLeft = state.defaultTime));
    },
    increasePomadoroCounter(state) {
      state.tasks[1] && (state.tasks[1].pomadoroCounter += 1);
    },
    increaseTimeoutTime(state) {
      state.timeoutTimeLeft -= 1;
    },
    changeTimeoutTimeLeft(state, action: PayloadAction<number>) {
      state.timeoutTimeLeft = action.payload;
    },
    changeStatisticsWeekAgo(state, action: PayloadAction<0 | 1 | 2>) {
      state.statisticsWeekAgo = action.payload;
    },
  },
});

export const {
  pushTasksReducer,
  inputValue,
  resetActiveTaskTimeLeft,
  deleteTasksReducer,
  changeTasksReducer,
  changeActiveTaskTimeLeft,
  changeStatisticsWeekAgo,
  changeTimeoutTimeLeft,
  increasePomadoroCounter,
  increaseTimeoutTime,
} = counterSlice.actions;

export const taskReducers = counterSlice.reducer;
