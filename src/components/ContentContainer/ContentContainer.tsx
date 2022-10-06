import React, { useState } from "react";
import { TaskContainer, tasks } from "../TaskContainer";
import { TextList, items } from "../TextList";
import styles from "./contentcontainer.less";
import { store } from "../../store/store";
import { TaskForm } from "../TaskForm/TaskForm";

export function ContentContainer() {
  const [tasksList, setTasksList] = useState(tasks);
  function handleClick() {
    const taskName = store.getState().value;
    if (!taskName) return;
    setTasksList(tasksList.concat(taskName));
    tasks.push(taskName);
  }
  return (
    <div className={styles.container}>
      <TextList title="Ура! Теперь можно начать работать:" items={items} />
      <TaskForm click={handleClick} />
      <TaskContainer time={"25 мин"} tasks={tasksList} func={setTasksList}/>
    </div>
  );
}
