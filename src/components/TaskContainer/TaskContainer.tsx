import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  pushStatisticsReducer,
  TstatisticsElement,
} from "../../store/statisticsSlice";
import { pushTasksReducer, TInitialState, TTaskState } from "../../store/slice";
import { randomString } from "../../utilits/randomString";
import { ListItem } from "../ListItem/ListItem";
import { Task } from "./Task/Task";
import styles from "./taskcontainer.less";
import { dateFormat } from "../../utilits/dateFormat";

const newStatisticObject = [
  {
    date: dateFormat,
    value: {
      workingTime: 0,
      pauseTime: 0,
      pauseCounter: 0,
      finishedPomadoro: 0,
      activeTaskCounter: 1,
      timeoutCounter: 0,
    },
  },
];

export const tasks: Array<TTaskState> = [
  {
    taskName: "Помыть кошку",
    amount: 2,
    timeLeft: 3,
    pomadoroCounter: 1,
  },
  {
    taskName: "Побрить кошку",
    amount: 1,
    timeLeft: 3,
    pomadoroCounter: 1,
  },
  {
    taskName: "Покормить кошку",
    amount: 1,
    timeLeft: 3,
    pomadoroCounter: 1,
  },
];

export const statistics: Array<TstatisticsElement> = [
  {
    date: "2022 10 26",
    value: {
      workingTime: 1000,
      pauseTime: 100,
      pauseCounter: 1,
      finishedPomadoro: 1,
      activeTaskCounter: 1,
      timeoutCounter: 0,
    },
  },
  {
    date: "2022 10 25",
    value: {
      workingTime: 2000,
      pauseTime: 200,
      pauseCounter: 2,
      finishedPomadoro: 2,
      activeTaskCounter: 1,
      timeoutCounter: 0,
    },
  },
  {
    date: "2022 10 24",
    value: {
      workingTime: 3000,
      pauseTime: 300,
      pauseCounter: 3,
      finishedPomadoro: 3,
      activeTaskCounter: 1,
      timeoutCounter: 0,
    },
  },
];

export function TaskContainer() {
  const dispatch = useDispatch();
  const tasksState = useSelector<TInitialState, Array<TTaskState>>(
    (state) => state.tasks.tasks
  );

  const takssMemo = useMemo<JSX.Element>(() => {
    return (
      <ul className={styles.taskcontainer}>
        {tasksState.map(
          (el, index) =>
            index > 0 && (
              <ListItem key={randomString()}>
                <Task index={index} taskName={el.taskName} />
              </ListItem>
            )
        )}
      </ul>
    );
  }, [tasksState.length]);

  useEffect(() => {
    dispatch(pushTasksReducer(tasks));
    dispatch(pushStatisticsReducer(statistics));
    if (statistics[statistics.length - 1].date !== dateFormat)
      dispatch(pushStatisticsReducer(newStatisticObject));
  }, []);

  return (
    <div className={styles.container}>
      {takssMemo}
      <div className={styles.time}>25 мин</div>
    </div>
  );
}
