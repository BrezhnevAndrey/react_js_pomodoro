import React from "react";
import styles from "./pomadoroinformation.less";
import TomatoIcon from "../../images/svg/tomato.svg";
import Pomadoro from "../../images/svg/pomadoro.svg";
import { useSelector } from "react-redux";
import {
  TstatisticsElement,
  TStatisticsState,
} from "../../store/statisticsSlice";
import classNames from "classnames";

export function PomadoroInformation() {
  const activeDay = useSelector<TStatisticsState, TstatisticsElement>(
    (state) => state.statistics.activeElement
  );

  const data = useSelector<TStatisticsState, Array<TstatisticsElement>>(
    (state) => state.statistics.dataset
  );

  const element = activeDay;

  const pomadoroFinished = element.value.finishedPomadoro;

  const wrapperClasses = classNames(
    { [styles["imageInformation"]]: pomadoroFinished !== 0 },
    { [styles["emptyImageInformation"]]: pomadoroFinished === 0 }
  );

  return (
    <div className={styles.container}>
      <div className={wrapperClasses}>
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
