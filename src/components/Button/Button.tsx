import React from "react";
import styles from "./button.less";

interface IButton {
  text: string;
}

export function Button({text}: IButton) {
  return <button className={styles.button}>{text}</button>;
}
