import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  TstatisticsElement,
  TStatisticsState,
} from "../../store/statisticsSlice";
import styles from "./timeinformation.less";

export function TimeInformation() {
  const activeDay = useSelector<TStatisticsState, number>(
    (state) => state.statistics.activeIndex
  );
  const data = useSelector<TStatisticsState, Array<TstatisticsElement>>(
    (state) => state.statistics.dataset
  );
  useEffect(() => {
    console.log(data[activeDay], activeDay);
  });

  console.log(data);
  return (
    <div className={styles.container}>
      <h3>{data[activeDay].date.dayName}</h3>
      <p>
        Вы работали над задачами в течении{" "}
        {Math.floor(data[activeDay].value.workingTime / 3600)} ч.{" "}
        {Math.floor((data[activeDay].value.workingTime % 3600) / 60)} мин.
      </p>
    </div>
  );
}
