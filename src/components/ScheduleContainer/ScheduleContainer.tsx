import React from "react";
import { PomadoroInformation } from "../PomadoroInformation/PomadoroInformation";
import { Schedule } from "../Schedule/Schedule";
import { TimeInformation } from "../TimeInformation";
import styles from "./schedulecontainer.less";

export function ScheduleContainer() {
  return (
    <div className={styles.container}>
      <div className={styles.information}>
        <TimeInformation />
        <PomadoroInformation />
      </div>
      <Schedule />
    </div>
  );
}
