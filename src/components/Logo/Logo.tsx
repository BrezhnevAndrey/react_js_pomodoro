import React from "react";
import styles from "./logo.less";
import ImageIcon from "../../images/svg/tomato.svg";

export function Logo() {
  return (
    <div className={styles.logo}>
      <ImageIcon />
      <span>pomodoro_box</span>
    </div>
  );
}
