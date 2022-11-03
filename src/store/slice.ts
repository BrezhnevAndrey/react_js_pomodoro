import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type TInitialState = {
  tasks: {
    inputValue: string;
    defaultTime: number;
    tasks: Array<TTaskState>;
  };
};

export type TTaskState = {
  taskName: string;
  amount: number;
  timeLeft: number;
  pomadoroCounter: number;
};

const counterSlice = createSlice({
  name: "task",
  initialState: {
    inputValue: "",
    defaultTime: 1500,
    tasks: [
      {
        taskName: "Нет задач",
        amount: 0,
        timeLeft: 0,
        pomadoroCounter: 1,
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
    resetActiveTaskTimeLeft(state) {
      state.tasks[1] && (state.tasks[1].timeLeft = state.defaultTime);
    },
    increasePomadoroCounter(state) {
      state.tasks[1] && (state.tasks[1].pomadoroCounter += 1);
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
  increasePomadoroCounter,
} = counterSlice.actions;

export const taskReducers = counterSlice.reducer;
