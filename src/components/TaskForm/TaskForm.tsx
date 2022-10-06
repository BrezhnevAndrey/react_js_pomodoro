import React, { FormEvent, useRef } from "react";
import { Button } from "../Button/Button";
import { InputText } from "../InputText/InputText";
import styles from "./taskform.less";

interface ITaskForm {
  click: () => void;
}

export function TaskForm({ click }: ITaskForm) {
  const refInput = useRef<HTMLInputElement>(null);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (refInput.current) refInput.current.value = '';
  }
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <InputText myRef={refInput} />
      <Button style="green" text="Добавить" click={click} />
    </form>
  );
}
