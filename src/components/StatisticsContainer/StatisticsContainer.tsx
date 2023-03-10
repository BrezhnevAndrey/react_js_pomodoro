import classNames from "classnames";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  increasePauseTime,
} from "../../store/statisticsSlice";
import { TTimerState } from "../../store/timerSlice";
import { IUserOptions } from "../../store/userOptionsSlice";
import { InformationsContainer } from "../InformationsContainer/InformationsContainer";
import { IntervalOptions } from "../IntervalOptions/IntervalOptions";
import { ScheduleContainer } from "../ScheduleContainer";
import styles from "./statisticscontainer.less";

export function StatisticsContainer() {
  const dispatch = useDispatch();
  const IsPaused = useSelector<TTimerState, boolean>(
    (state) => state.timer.IsPaused
  );
  const IsBlackTheme = useSelector<IUserOptions, boolean>(
    (state) => state.userOptions.IsBlackTheme
  );
  const statisticsClass = classNames(styles["container"], {
    [styles["blackTheme"]]: IsBlackTheme,
  });

  useEffect(() => {
    if (!IsPaused) return;
    const timerId = setInterval(() => {
      dispatch(increasePauseTime());
    }, 1000);
    return () => clearInterval(timerId);
  }, []);

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
