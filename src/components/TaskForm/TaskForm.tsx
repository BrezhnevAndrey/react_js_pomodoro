import React, { FormEvent, useRef } from "react";
import { useDispatch } from "react-redux";
import { pushTasksReducer, inputValue } from "../../store/slice";
import { Button } from "../Button/Button";
import { InputText } from "../InputText/InputText";
import { tasks } from "../TaskContainer/TaskContainer";
import styles from "./taskform.less";

export function TaskForm() {
  const refInput = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (
      !refInput.current ||
      (refInput.current && !refInput.current.value.trim())
    )
      return;

    dispatch(inputValue(refInput.current.value));

    const task = {
      taskName: refInput.current.value,
      amount: 1,
      timeLeft: 6,
      pauseTime: 0,
      pauseCounter: 0,
      pomadoroCounter: 1,
    };
    dispatch(pushTasksReducer([task]));
    tasks.push(task);
    refInput.current.value = "";
    dispatch(inputValue(""));
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <InputText myRef={refInput} />
      <Button style="green" text="Добавить" />
    </form>
  );
}
