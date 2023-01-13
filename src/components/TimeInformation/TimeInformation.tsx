import React from "react";
import { useSelector } from "react-redux";
import {
  TstatisticsElement,
  TStatisticsState,
} from "../../store/statisticsSlice";
import { emptyDay } from "../../utilits/today";
import styles from "./timeinformation.less";

export function TimeInformation() {
  const activeDay = useSelector<TStatisticsState, TstatisticsElement>(
    (state) => state.statistics.activeElement
  );

  return (
    <div className={styles.container}>
      <h3>
        {activeDay !== emptyDay
          ? activeDay.date.dayName
          : `В этот день вы не пользовались приложение`}
      </h3>
      <p>
        {activeDay !== emptyDay
          ? `Вы работали над задачами в течении
        ${Math.floor(activeDay.value.workingTime / 3600)} ч.
        ${Math.floor((activeDay.value.workingTime % 3600) / 60)} мин.`
          : ""}
      </p>
    </div>
  );
}
