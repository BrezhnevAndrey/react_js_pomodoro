import React from "react";
import { useSelector } from "react-redux";
import {
  TstatisticsElement,
  TStatisticsState,
} from "../../store/statisticsSlice";
import { InformationElement } from "./InformationElement/InformationElement";
import styles from "./informationscontainer.less";
import ImgStatisticFocus from "../../images/svg/statistic-focus.svg";
import ImgStatisticTime from "../../images/svg/statistic-time.svg";
import ImgStatisticPause from "../../images/svg/statistic-pause.svg";

export function InformationsContainer() {
  const activeElement = useSelector<TStatisticsState, TstatisticsElement>(
    (state) => state.statistics.activeElement
  );
  const data = useSelector<TStatisticsState, Array<TstatisticsElement>>(
    (state) => state.statistics.dataset
  );
  const activeDay = activeElement;
  const focusValue = Math.round(
    activeDay.value.workingTime / activeDay.value.timeToComplite
  );
  return (
    <div className={styles.container}>
      <InformationElement
        type={"Фокус"}
        data={`${Number.isNaN(focusValue) ? 0 : focusValue}%`}
        image={<ImgStatisticFocus />}
      />
      <InformationElement
        type={"Время на паузе"}
        data={`${Math.round(activeDay.value.pauseTime / 3600)}ч ${Math.round(
          (activeDay.value.pauseTime % 3600) / 60
        )}м`}
        image={<ImgStatisticTime />}
      />
      <InformationElement
        type={"Остановки"}
        data={`${activeDay.value.pauseCounter}`}
        image={<ImgStatisticPause />}
      />
    </div>
  );
}
