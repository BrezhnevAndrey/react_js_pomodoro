import React from "react";
import styles from "./pomadoroinformation.less";
import TomatoIcon from "../../images/svg/tomato.svg";
import Pomadoro from "../../images/svg/pomadoro.svg";
import { useSelector } from "react-redux";
import {
  TstatisticsElement,
  TStatisticsState,
} from "../../store/statisticsSlice";

export function PomadoroInformation() {
  const activeDay = useSelector<TStatisticsState, number>(
    (state) => state.statistics.activeIndex
  );

  const data = useSelector<TStatisticsState, Array<TstatisticsElement>>(
    (state) => state.statistics.dataset
  );

  const element = data[activeDay];

  const pomadoroFinished = element.value.finishedPomadoro;

  return (
    <div className={styles.container}>
      <div className={styles.imageInformation}>
        {pomadoroFinished === 0 ? (
          <Pomadoro />
        ) : (
          <>
            <TomatoIcon />
            <span> X {pomadoroFinished}</span>
          </>
        )}
      </div>
      {pomadoroFinished !== 0 && (
        <div className={styles.textInformation}>
          {pomadoroFinished} помидора
        </div>
      )}
    </div>
  );
}
