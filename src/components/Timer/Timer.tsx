import React, { useEffect, useState } from "react";
import { Button } from "../Button/Button";
import { OpenButton } from "../OpenButton/OpenButton";
import styles from "./timer.less";

export function Timer() {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(25);
  const [IsTurnUp, setIsTurnUp] = useState(false);

  const tick = () => {
    if (minutes === 0 && seconds === 0) return;
    else if (seconds === 0) {
      setMinutes(minutes - 1);
      setSeconds(59);
    } else setSeconds(seconds - 1);
  };

  useEffect(() => {
    if (IsTurnUp) {
      const timerId = setInterval(() => tick(), 1000);
      console.log(seconds, minutes);
      setSeconds(seconds);
      setMinutes(minutes);
      return () => clearInterval(timerId);
    }
  }, [seconds, minutes, IsTurnUp]);

  return (
    <div className={styles.container}>
      <div className={styles.timer}>
        <div className={styles.value}>{`${minutes}:${seconds}`}</div>
        <OpenButton />
      </div>
      <div className={styles.task}>
        <span className={styles.taskNumber}>Задача 1 - </span>
        <span className={styles.taskString}>Сверстать сайт</span>
      </div>
      <div className={styles.btnContainer}>
        <Button
          text={"Старт"}
          style={"green"}
          click={() => setIsTurnUp(true)}
        />
        <Button text={"Стоп"} style={"red"} click={() => setIsTurnUp(false)} />
      </div>
    </div>
  );
}
