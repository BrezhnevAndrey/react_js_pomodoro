import { openDB } from "idb";
import React, { FormEvent, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  pushTasksReducer,
  inputValue,
  TInitialState,
  TTaskState,
} from "../../store/slice";
import { IUserOptions } from "../../store/userOptionsSlice";
import { Button } from "../Button/Button";
import { InputText } from "../InputText/InputText";
import styles from "./taskform.less";

export function TaskForm() {
  const dispatch = useDispatch();
  const refInput = useRef<HTMLInputElement>(null);
  const [IsTasksLoading, setIsTasksLoading] = useState(false);
  const taskArray = useSelector<TInitialState, Array<TTaskState>>(
    (state) => state.tasks.tasks
  );
  const pomadoroDuration = useSelector<IUserOptions, number>(
    (state) => state.userOptions.pomadoroDuration
  );

  useEffect(() => {
    const changeDB = async () => {
      const db = await openDB("pomadoro");
      const tx = db.transaction("tasks", "readwrite");
      const store = tx.objectStore("tasks");
      const pice = taskArray.slice(1, taskArray.length);
      const result = {
        id: 1,
        value: pice,
      };
      IsTasksLoading && (await store.put(result));
    };
    changeDB();
    setIsTasksLoading(true);
  }, [taskArray]);

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
      timeLeft: pomadoroDuration,
      pomadoroCounter: 1,
    };
    dispatch(pushTasksReducer([task]));
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
