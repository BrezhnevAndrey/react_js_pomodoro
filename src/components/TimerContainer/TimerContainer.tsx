import React from "react";
import { Timer } from "./Timer/Timer";
import styles from "./timercontainer.less";
import { useSelector } from "react-redux";
import { TInitialState, TTaskState } from "../../store/slice";
import classNames from "classnames";
import { TStatisticsState } from "../../store/statisticsSlice";
import { TTimerState } from '../../store/timerSlice';

export function TimerContainer() {
  const activeTask = useSelector<TInitialState, TTaskState>((state) =>
    state.tasks.tasks.length > 1 ? state.tasks.tasks[1] : state.tasks.tasks[0]
  );

  const timeoutCounter = useSelector<TStatisticsState, number>(
    (state) =>
      state.statistics[state.statistics.length - 1].value.timeoutCounter
  );

  const IsTimeout = useSelector<TTimerState, boolean>(
    (state) => state.timer.IsTimeout
  );

  const IsStarted = useSelector<TTimerState, boolean>(
    (state) => state.timer.IsStarted
  );

  const classesTimerContainer = classNames(styles[`header`], {
    [styles["header--timeout"]]: IsTimeout,
    [styles["header--active"]]: IsStarted && !IsTimeout,
  });

  return (
    <div className={styles.container}>
      <div className={classesTimerContainer}>
        <div>{activeTask.taskName}</div>
        <div>
          {IsTimeout
            ? `${timeoutCounter} перерыв за день`
            : `Помидор ${activeTask.pomadoroCounter}`}
        </div>
      </div>
      <div className={styles.main}>
        <Timer />
      </div>
    </div>
  );
}
