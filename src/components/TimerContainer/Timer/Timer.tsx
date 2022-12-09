import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeTimeToComplete,
  incraseActiveTaskTime,
  increaseActiveTaskCounter,
  increaseFinishedPomadoro,
  increasePauseCounter,
  increasePauseTime,
  increaseTimeoutCounter,
  increaseWorkingTime,
} from "../../../store/statisticsSlice";
import {
  changeIsPaused,
  changeIsStarted,
  changeIsTimeout,
  TTimerState,
} from "../../../store/timerSlice";
import {
  changeActiveTaskTimeLeft,
  changeTasksReducer,
  deleteTasksReducer,
  increasePomadoroCounter,
  resetActiveTaskTimeLeft,
  TInitialState,
  TTaskState,
} from "../../../store/slice";
import { Button } from "../../Button/Button";
import { AddTimeButton } from "../../AddTimeButton/AddTimeButton";
import styles from "./timer.less";
import { TStatisticsState } from "../../../store/statisticsSlice";

export function Timer() {
  const timeoutTimeDefault = 4;
  const dispatch = useDispatch();

  const activeTask = useSelector<TInitialState, TTaskState>((state) =>
    state.tasks.tasks[1] ? state.tasks.tasks[1] : state.tasks.tasks[0]
  );
  const IsActiveTasks = useSelector<TInitialState, boolean>((state) =>
    state.tasks.tasks[1] ? true : false
  );
  const activeTaskCounter = useSelector<TStatisticsState, number>(
    (state) =>
      state.statistics.dataset[state.statistics.dataset.length - 1].value
        .activeTaskCounter
  );
  const IsTimeout = useSelector<TTimerState, boolean>(
    (state) => state.timer.IsTimeout
  );
  const IsStarted = useSelector<TTimerState, boolean>(
    (state) => state.timer.IsStarted
  );
  const IsPaused = useSelector<TTimerState, boolean>(
    (state) => state.timer.IsPaused
  );

  const activeTaskTime = useSelector<TStatisticsState, number>(
    (state) => state.statistics.activeTaskTime
  );

  const [timeoutTime, setTimeoutTime] = useState(0);
  const seconds = IsTimeout ? timeoutTime % 60 : activeTask.timeLeft % 60;
  const minutes = IsTimeout
    ? Math.trunc(timeoutTime / 60)
    : Math.trunc(activeTask.timeLeft / 60);

  const tick = () => {
    if (!IsActiveTasks) return;

    if (activeTask.timeLeft === 0 && !IsTimeout) {
      dispatch(changeTasksReducer([1, -1])) &&
        dispatch(increaseFinishedPomadoro());
      dispatch(increasePomadoroCounter());
      if (activeTask.amount > 0) {
        setTimeoutTime(timeoutTimeDefault);
        dispatch(changeIsTimeout(true));
        dispatch(increaseTimeoutCounter());
      }

      return;
    }
    dispatch(changeActiveTaskTimeLeft(-1));
    dispatch(increaseWorkingTime());
    dispatch(incraseActiveTaskTime());
  };

  const timeoutTick = () => {
    if (timeoutTime > 0) setTimeoutTime((prevState) => prevState - 1);
    else dispatch(changeIsTimeout(false));
  };

  const pauseTick = () => {
    if (!IsActiveTasks) return;
    dispatch(increasePauseTime());
  };

  const timeFormat = (value: number): string => {
    if (value.toString().length === 1) return `0${value.toString()}`;
    else return value.toString();
  };

  const handleAddTimeButtonClick = () => {
    IsActiveTasks && dispatch(changeActiveTaskTimeLeft(60));
  };

  useEffect(() => {
    // if(activeTask.amount === 0 && !IsTimeout) {
    //   return ();
    // }
    if (!IsActiveTasks) {
      dispatch(changeIsStarted(false));
      dispatch(changeIsTimeout(false));
      dispatch(changeIsPaused(false));
    }
    if (IsStarted && !IsTimeout && !IsPaused) {
      const timerId = setInterval(() => tick(), 1000);
      return () => clearInterval(timerId);
    }
    if (IsTimeout && !IsPaused) {
      if (IsStarted) dispatch(changeIsStarted(false));
      if (activeTask.amount === 0) {
        dispatch(deleteTasksReducer(1));
        dispatch(increaseActiveTaskCounter());
      }
      const timerId = setInterval(() => timeoutTick(), 1000);
      return () => clearInterval(timerId);
    }
    if (IsPaused) {
      const timerId = setInterval(() => pauseTick(), 1000);
      return () => clearInterval(timerId);
    }
    if (activeTask.amount !== 0 && activeTask.timeLeft === 0)
      dispatch(resetActiveTaskTimeLeft());
  }, [seconds, minutes, IsPaused, IsStarted, IsTimeout]);

  return (
    <div className={styles.container}>
      <div className={styles.timer}>
        <div className={styles.value}>
          {timeFormat(minutes) + ":" + timeFormat(seconds)}
        </div>
        <AddTimeButton
          disabled={IsTimeout ? true : false}
          click={handleAddTimeButtonClick}
        />
      </div>
      <div className={styles.task}>
        <span className={styles.taskNumber}>
          {!IsActiveTasks ? "Нет задач" : `Задача ${activeTaskCounter} -`}{" "}
        </span>
        <span className={styles.taskString}>
          {IsActiveTasks && activeTask.taskName}
        </span>
      </div>
      <div className={styles.btnContainer}>
        {activeTask.amount > 0 && !IsTimeout && !IsStarted && (
          <Button
            text={"Старт"}
            style={"green"}
            click={() => {
              if (activeTask.amount === 0) return;
              dispatch(changeIsStarted(true));
            }}
          />
        )}
        {(IsStarted || IsTimeout) && !IsPaused && (
          <Button
            text={"Пауза"}
            style={"green"}
            click={() => {
              dispatch(changeIsPaused(true));
              dispatch(increasePauseCounter());
            }}
          />
        )}
        {(activeTask.amount === 0 || IsPaused) && (
          <Button
            text={"Продолжить"}
            style={"green"}
            click={() => {
              (IsTimeout || activeTask.timeLeft !== 0) &&
                dispatch(changeIsPaused(false));
            }}
          />
        )}
        {IsTimeout && (
          <Button
            text={"Пропустить"}
            style={"green"}
            click={() => {
              dispatch(changeIsPaused(false));
              dispatch(changeIsTimeout(false));
              setTimeoutTime(timeoutTimeDefault);
            }}
          />
        )}
        {activeTask.amount > 0 &&
          ((!IsStarted && !IsTimeout) ||
            (IsStarted && !IsPaused && !IsTimeout)) && (
            <Button
              text={"Стоп"}
              style={"red"}
              disabled={IsStarted ? false : true}
              click={() => {
                dispatch(changeIsStarted(false));
                dispatch(resetActiveTaskTimeLeft());
              }}
            />
          )}
        {(activeTask.amount === 0 || (IsStarted && IsPaused)) && (
          <Button
            text={"Сделано"}
            style={"red"}
            click={() => {
              dispatch(changeIsPaused(false));
              dispatch(changeIsStarted(false));
              dispatch(deleteTasksReducer(1));
              dispatch(increaseActiveTaskCounter());
              dispatch(changeTimeToComplete(activeTaskTime));
            }}
          />
        )}
      </div>
    </div>
  );
}
