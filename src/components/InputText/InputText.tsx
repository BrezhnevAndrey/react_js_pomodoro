import React from "react";
import styles from "./inputtext.less";

interface IInputText {
  myRef?: React.RefObject<HTMLInputElement>;
}

export function InputText({ myRef }: IInputText) {
  return (
    <input
      type="text"
      className={styles.input}
      placeholder="Название задачи"
      ref={myRef}
    />
  );
}
