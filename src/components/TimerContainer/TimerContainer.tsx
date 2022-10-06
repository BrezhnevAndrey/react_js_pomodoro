import React from "react";
import { Timer } from "./Timer/Timer";
import styles from "./timercontainer.less";

export function TimerContainer() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>Сверстать сайт </div>
        <div>Помидор 1</div>
      </div>
      <div className={styles.main}>
        <Timer />
      </div>
    </div>
  );
}
