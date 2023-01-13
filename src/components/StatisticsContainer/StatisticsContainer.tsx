import classNames from "classnames";
import React from "react";
import { useSelector } from "react-redux";
import { IUserOptions } from "../../store/userOptionsSlice";
import { InformationsContainer } from "../InformationsContainer/InformationsContainer";
import { IntervalOptions } from "../IntervalOptions/IntervalOptions";
import { ScheduleContainer } from "../ScheduleContainer";
import styles from "./statisticscontainer.less";

export function StatisticsContainer() {
  const IsBlackTheme = useSelector<IUserOptions, boolean>(
    (state) => state.userOptions.IsBlackTheme
  );
  const statisticsClass = classNames(styles["container"], {
    [styles["blackTheme"]]: IsBlackTheme,
  });
  return (
    <div className={statisticsClass}>
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
