import React from "react";
import styles from "./button.less";

interface IButton {
  text: string;
  style: "green" | "red";
  click?: () => void;
}

export function Button({ text, style, click }: IButton) {
  return (
    <button
      onClick={click}
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
