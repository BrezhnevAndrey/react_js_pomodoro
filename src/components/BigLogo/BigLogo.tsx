import React from "react";
import styles from "./biglogo.less";
import FrontImage from "../../images/svg/big_tomato.svg";

export function BigLogo() {
  return (
    <div className={styles.container}>
      <FrontImage />
      <span className={styles.description}>pomodoro_box</span>
    </div>
  );
}
