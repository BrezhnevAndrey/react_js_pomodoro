import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import styles from "./inputtext.less";
import { store, taskReducer } from "../../store/store";

interface IInputText {
  myRef?: React.RefObject<HTMLInputElement>;
}

export function InputText({ myRef }: IInputText) {
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    store.dispatch(taskReducer(event.target.value));
  }

  return (
    <input
      type="text"
      className={styles.input}
      placeholder="Название задачи"
      onChange={handleChange}
      ref={myRef}
    />
  );
}
