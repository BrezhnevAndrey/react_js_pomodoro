import React, { useState } from "react";
import { ListItem } from "../ListItem/ListItem";
import { Task } from "./Task/Task";
import styles from "./taskcontainer.less";

export const tasks: Array<string> = ["кошка", "сабака"];

interface ITaskContainer {
  time: string;
  tasks: Array<string>;
  func: React.Dispatch<React.SetStateAction<string[]>>;
}

export function TaskContainer({ time, tasks, func }: ITaskContainer) {
  


  const deleteTask: (...args: any) => void = (
    number: number,
    tasks: Array<string>
  ) => {
    func(tasks.filter((item, index) => index !== number - 1));
    tasks.splice(number - 1, 1);
  };

  return (
    <div className={styles.container}>
      <ul className={styles.taskcontainer}>
        {tasks.map((el, index) => (
          <ListItem key={index.toString()}>
            <Task number={index + 1} taskName={el} deleteFunc={deleteTask} />
          </ListItem>
        ))}
      </ul>
      <div className={styles.time}>{time}</div>
    </div>
  );
}
