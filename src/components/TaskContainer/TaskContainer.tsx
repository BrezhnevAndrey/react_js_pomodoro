import React from "react";
import { Task } from "../Task/Task";
import styles from "./taskcontainer.less";

export const tasks = ["побрить кошку", "помыть кошку", "погладить кошку"];

interface ITaskContainer {
  time: string;
  tasks: Array<string>;
}

export function TaskContainer({ time, tasks }: ITaskContainer) {
  return (
    <div className={styles.container}>
      <ul className={styles.taskcontainer}>
        {tasks.map((el, index) => (
          <li key={index}>
            <Task number={index + 1} taskName={el} />
          </li>
        ))}
      </ul>
      <div className={styles.time}>{time}</div>
    </div>
  );
}
