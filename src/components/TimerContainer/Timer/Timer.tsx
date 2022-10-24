import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeActiveTaskTimeLeft,
  increasePauseCounter,
  increasePauseTime,
  resetActiveTaskTimeLeft,
  TInitialState,
  TTaskState,
} from "../../../store/slice";
import { Button } from "../../Button/Button";
import { OpenButton } from "../../OpenButton/OpenButton";
import styles from "./timer.less";

export function Timer() {
  const dispatch = useDispatch();

  const activeTask = useSelector<TInitialState, TTaskState>((state) =>
    state.tasks.tasks[1] ? state.tasks.tasks[1] : state.tasks.tasks[0]
  );
  const seconds = activeTask.timeLeft % 60;
  const minutes = Math.trunc(activeTask.timeLeft / 60);
  const [IsPaused, setIsPaused] = useState(true);
  const [IsStarted, setIsStarted] = useState(false);

  const tick = () => {
    if (activeTask.timeLeft === 0) {
      setIsPaused(true);
      return;
    }
    dispatch(changeActiveTaskTimeLeft(-1));
  };

  const pauseTick = () => {
    if (activeTask.timeLeft === 0) return;
    dispatch(increasePauseTime(1));
  };

  const timeFormat = (value: number): string => {
    if (value.toString().length === 1) return `0${value.toString()}`;
    else return value.toString();
  };

  useEffect(() => {
    if (!IsPaused && IsStarted) {
      const timerId = setInterval(() => tick(), 1000);
      return () => clearInterval(timerId);
    }
    if (IsPaused && IsStarted) {
      const timerId = setInterval(() => pauseTick(), 1000);
      return () => clearInterval(timerId);
    }
  }, [seconds, minutes, IsPaused, IsStarted]);

  useEffect(() => {
    console.log("sdsad");
    setIsStarted(false);
    setIsPaused(true);
  }, [activeTask.taskName]);

  return (
    <div className={styles.container}>
      <div className={styles.timer}>
        <div className={styles.value}>
          {timeFormat(minutes) + ":" + timeFormat(seconds)}
        </div>
        <OpenButton />
      </div>
      <div className={styles.task}>
        <span className={styles.taskNumber}>Задача 1 - </span>
        <span className={styles.taskString}>Сверстать сайт</span>
      </div>
      <div className={styles.btnContainer}>
        {!IsStarted && (
          <Button
            text={"Старт"}
            style={"green"}
            click={() => {
              setIsPaused(false);
              setIsStarted(true);
            }}
          />
        )}
        {IsStarted && IsPaused && (
          <Button
            text={"Продолжить"}
            style={"green"}
            click={() => {
              setIsPaused(false);
            }}
          />
        )}
        {!IsPaused && (
          <Button
            text={"Пауза"}
            style={"green"}
            click={() => {
              setIsPaused(true);
              dispatch(increasePauseCounter());
            }}
          />
        )}
        {(!IsStarted || !IsPaused) && (
          <Button
            text={"Стоп"}
            style={"red"}
            click={() => {
              setIsPaused(true);
              setIsStarted(false);
              dispatch(resetActiveTaskTimeLeft());
            }}
          />
        )}
        {IsStarted && IsPaused && (
          <Button
            text={"Сделано"}
            style={"red"}
            click={() => {
              setIsPaused(true);
              setIsStarted(false);
              dispatch(resetActiveTaskTimeLeft());
            }}
          />
        )}
      </div>
    </div>
  );
}
