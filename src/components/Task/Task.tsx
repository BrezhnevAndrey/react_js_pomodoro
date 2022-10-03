import React, { useState } from "react";
import { ActionsList } from "../ActionsList/ActionsList";
import styles from "./task.less";
import { TaskButton } from "./TaskButton/TaskButton";

interface ITask {
  number: number;
  taskName: string;
}

export function Task({ number, taskName }: ITask) {
  const [IsOpenActions, setIsOpenActions] = useState(false);
  return (
    <div className={styles.container}>
      <span className={styles.number}>{number}</span>
      <span className={styles.taskName}>{taskName}</span>
      <div className={styles.buttonContainer}>
        <TaskButton
          click={() =>
            IsOpenActions ? setIsOpenActions(false) : setIsOpenActions(true)
          }
        />
        {IsOpenActions && (
          <div className={styles.actionContainer}>
            <ActionsList />
          </div>
        )}
      </div>
    </div>
  );
}
