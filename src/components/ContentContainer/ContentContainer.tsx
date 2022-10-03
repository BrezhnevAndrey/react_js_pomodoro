import React, { useState } from "react";
import { Button } from "../Button";
import { InputText } from "../InputText";
import { TaskContainer, tasks } from "../TaskContainer";
import { TextList, items } from "../TextList";
import styles from "./contentcontainer.less";
import { store } from "../../store/store";

export function ContentContainer() {
  const [tasksList, setTasksList] = useState(tasks);
  function handleClick() {
    const taskName = store.getState().value;
    if (!taskName) return;
    const list = tasksList.concat(taskName);
    setTasksList(list);
  }
  return (
    <div className={styles.container}>
      <TextList title="Ура! Теперь можно начать работать:" items={items} />
      <InputText />
      <Button text={"Добавить"} style={"green"} click={handleClick} />
      <TaskContainer time={"25 мин"} tasks={tasksList} />
    </div>
  );
}
