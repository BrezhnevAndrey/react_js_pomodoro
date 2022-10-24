import React from "react";
import { Timer } from "./Timer/Timer";
import styles from "./timercontainer.less";
import { useSelector } from "react-redux";
import { TInitialState, TTaskState } from "../../store/slice";

export function TimerContainer() {
  const activeTask = useSelector<TInitialState, TTaskState>((state) =>
    state.tasks.tasks.length > 1 ? state.tasks.tasks[1] : state.tasks.tasks[0]
  );

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>{activeTask.taskName}</div>
        <div>Помидор {activeTask.amount}</div>
      </div>
      <div className={styles.main}>
        <Timer />
      </div>
    </div>
  );
}
