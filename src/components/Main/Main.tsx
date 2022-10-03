import React from "react";
import { ContentContainer } from "../ContentContainer/ContentContainer";
import { TimerContainer } from "../TimerContainer/TimerContainer";
import styles from "./main.less";

export function Main() {
  return (
    <div className={styles.container}>
      <ContentContainer />
      <TimerContainer />
    </div>
  );
}
