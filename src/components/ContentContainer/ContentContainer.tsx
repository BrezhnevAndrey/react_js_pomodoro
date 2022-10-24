import React from "react";
import { TaskContainer } from "../TaskContainer";
import { TextList } from "../TextList";
import styles from "./contentcontainer.less";
import { TaskForm } from "../TaskForm/TaskForm";

const items = [
  "Выберите категорию и напишите название текущей задачи",
  "Запустите таймер («помидор»)",
  "Работайте пока «помидор» не прозвонит",
  "Сделайте короткий перерыв (3-5 минут)",
  "Продолжайте работать «помидор» за «помидором», пока задача не будут выполнена",
  "Каждые 4 «помидора» делайте длинный перерыв (15-30 минут)",
];

export function ContentContainer() {
  return (
    <div className={styles.container}>
      <TextList title="Ура! Теперь можно начать работать:" items={items} />
      <TaskForm />
      <TaskContainer />
    </div>
  );
}
