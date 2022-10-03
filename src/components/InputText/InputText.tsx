import React, { ChangeEvent, useEffect, useState } from "react";
import styles from "./inputtext.less";
import { store, taskReducer } from "../../store/store";

export function InputText() {
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    store.dispatch(taskReducer(event.target.value));
  }

  return (
    <input
      type="text"
      className={styles.input}
      placeholder="Название задачи"
      onChange={handleChange}
    />
  );
}
