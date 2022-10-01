import React from "react";
import styles from "./button.less";

interface IButton {
  text: string;
  style: "green" | "red";
}

export function Button({ text, style }: IButton) {
  return (
    <button
      className={
        style === "green"
          ? `${styles.button} ${styles["button--green"]}`
          : `${styles.button} ${styles["button--red"]}`
      }
    >
      {text}
    </button>
  );
}
