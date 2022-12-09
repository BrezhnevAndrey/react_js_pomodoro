import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TInitialState, TTaskState } from "../../store/slice";
import { randomString } from "../../utilits/randomString";
import { ListItem } from "../ListItem/ListItem";
import { Task } from "./Task/Task";
import styles from "./taskcontainer.less";

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

  return (
    <div className={styles.container}>
      {takssMemo}
      <div className={styles.time}>25 мин</div>
    </div>
  );
}
