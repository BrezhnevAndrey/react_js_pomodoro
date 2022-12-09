import React from "react";
import { InformationsContainer } from "../InformationsContainer/InformationsContainer";
import { IntervalOptions } from "../IntervalOptions/IntervalOptions";
import { ScheduleContainer } from "../ScheduleContainer";
import styles from "./statisticscontainer.less";

export function StatisticsContainer() {
  return (
    <div className={styles.container}>
      <div className={styles.section}>
        <h3 className={styles.title}>Ваша активность</h3>
        <div className={styles.options}>
          <IntervalOptions />
        </div>
      </div>
      <ScheduleContainer />
      <InformationsContainer />
    </div>
  );
}
