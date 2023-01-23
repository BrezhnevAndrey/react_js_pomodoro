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
  TstatisticsElement,
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
  changeTimeoutTimeLeft,
  deleteTasksReducer,
  increasePomadoroCounter,
  increaseTimeoutTime,
  resetActiveTaskTimeLeft,
  TInitialState,
  TTaskState,
} from "../../../store/slice";
import { Button } from "../../Button/Button";
import { AddTimeButton } from "../../AddTimeButton/AddTimeButton";
import styles from "./timer.less";
import { TStatisticsState } from "../../../store/statisticsSlice";
import useSound from "use-sound";
import violin from "../../../sounds/violin.mp3";
import { changeDBData } from "../../../store/indexedDB";
import { IUserOptions } from "../../../store/userOptionsSlice";

export function Timer() {
  const pomadoroDuration = useSelector<IUserOptions, number>(
    (state) => state.userOptions.pomadoroDuration
  );
  const shortTimeoutTime = useSelector<IUserOptions, number>(
    (state) => state.userOptions.shortTimeoutDuration
  );
  const longTimeoutTime = useSelector<IUserOptions, number>(
    (state) => state.userOptions.longTimeoutDuration
  );
  const intervalIndex = useSelector<IUserOptions, number>(
    (state) => state.userOptions.longTimeoutFrequency
  );

  const IsSoundNotification = useSelector<IUserOptions, boolean>(
    (state) => state.userOptions.IsSoundNotification
  );

  const [play] = useSound(violin);

  const dispatch = useDispatch();

  const [IsUseDB, setIsUseDB] = useState(false);

  const dataFromToday = useSelector<TStatisticsState, TstatisticsElement>(
    (state) => state.statistics.dataset[state.statistics.dataset.length - 1]
  );

  const timeoutCounter = useSelector<TStatisticsState, number>(
    (state) =>
      state.statistics.dataset[state.statistics.dataset.length - 1].value
        .timeoutCounter
  );

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

  const timeoutTime = useSelector<TInitialState, number>(
    (state) => state.tasks.timeoutTimeLeft
  );
  const seconds = IsTimeout ? timeoutTime % 60 : activeTask.timeLeft % 60;
  const minutes = IsTimeout
    ? Math.trunc(timeoutTime / 60)
    : Math.trunc(activeTask.timeLeft / 60);

  const tick = () => {
    if (!IsActiveTasks) return;

    if (activeTask.timeLeft === 0 && !IsTimeout) {
      IsSoundNotification && play();
      setTimeout(() => {
        alert("Время устроить перерыв");
      }, 1000);
      dispatch(changeTasksReducer([1, -1])) &&
        dispatch(increaseFinishedPomadoro());
      dispatch(increasePomadoroCounter());
      if (activeTask.amount > 1) {
        dispatch(changeIsTimeout(true));
        dispatch(increaseTimeoutCounter());
      } else dispatch(changeIsPaused(true));
      (timeoutCounter + 1) % intervalIndex === 0
        ? dispatch(changeTimeoutTimeLeft(longTimeoutTime))
        : dispatch(changeTimeoutTimeLeft(shortTimeoutTime));
      setIsUseDB(true);

      return;
    }
    dispatch(changeActiveTaskTimeLeft(-1));
    dispatch(increaseWorkingTime());
    dispatch(incraseActiveTaskTime());
  };

  const timeoutTick = () => {
    if (timeoutTime > 0) dispatch(increaseTimeoutTime());
    else {
      IsSoundNotification && play();
      dispatch(changeIsTimeout(false));
      setTimeout(() => {
        alert("Перерыв закончен");
      }, 1000);
    }
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
      if (IsStarted) {
        setIsUseDB(true);
        dispatch(changeIsStarted(false));
      }
      if (activeTask.amount === 0) {
        dispatch(deleteTasksReducer(1));
        dispatch(increaseActiveTaskCounter());
      }
      const timerId = setInterval(() => timeoutTick(), 1000);
      return () => clearInterval(timerId);
    }
    if ((IsPaused && activeTask.timeLeft > 0) || (IsPaused && IsTimeout)) {
      const timerId = setInterval(() => pauseTick(), 1000);
      return () => clearInterval(timerId);
    }
    if (activeTask.amount !== 0 && activeTask.timeLeft === 0)
      dispatch(resetActiveTaskTimeLeft(pomadoroDuration));

    if (IsUseDB) {
      changeDBData(dataFromToday);
      setIsUseDB(false);
    }
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
        {!IsTimeout && !IsStarted && (
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
              if (
                (!IsTimeout && activeTask.timeLeft !== 0) ||
                (IsTimeout && timeoutTime !== 0)
              ) {
                dispatch(changeIsPaused(true));
                dispatch(increasePauseCounter());
                setIsUseDB(true);
              }
            }}
          />
        )}
        {IsPaused && (
          <Button
            text={"Продолжить"}
            style={"green"}
            click={() => {
              if (activeTask.amount > 0 && activeTask.timeLeft === 0) {
                dispatch(changeIsPaused(false));
                dispatch(changeIsTimeout(true));
                dispatch(increaseTimeoutCounter());
              }
              (IsTimeout || activeTask.timeLeft !== 0) &&
                dispatch(changeIsPaused(false));
              setIsUseDB(true);
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
              (timeoutCounter + 1) % intervalIndex === 0
                ? dispatch(changeTimeoutTimeLeft(longTimeoutTime))
                : dispatch(changeTimeoutTimeLeft(shortTimeoutTime));
              setIsUseDB(true);
            }}
          />
        )}
        {((!IsStarted && !IsTimeout) ||
          (IsStarted && !IsPaused && !IsTimeout)) && (
          <Button
            text={"Стоп"}
            style={"red"}
            disabled={IsStarted ? false : true}
            click={() => {
              dispatch(changeIsStarted(false));
              dispatch(resetActiveTaskTimeLeft(pomadoroDuration));
              setIsUseDB(true);
            }}
          />
        )}
        {IsStarted && IsPaused && (
          <Button
            text={"Сделано"}
            style={"red"}
            click={() => {
              (timeoutCounter + 1) % intervalIndex === 0
                ? dispatch(changeTimeoutTimeLeft(longTimeoutTime))
                : dispatch(changeTimeoutTimeLeft(shortTimeoutTime));
              dispatch(changeIsTimeout(true));
              dispatch(increaseTimeoutCounter());
              dispatch(changeIsPaused(false));
              dispatch(changeIsStarted(false));
              dispatch(deleteTasksReducer(1));
              dispatch(increaseActiveTaskCounter());
              dispatch(changeTimeToComplete(activeTaskTime));
              setIsUseDB(true);
            }}
          />
        )}
      </div>
    </div>
  );
}
