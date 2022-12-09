import classNames from "classnames";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeStatisticsWeekAgo, TInitialState } from "../../store/slice";
import styles from "./intervaloptions.less";

interface IIntervalOptionsElement {
  text: string;
  weekAgo: 0 | 1 | 2;
  click: () => void;
  selected: boolean;
}

export function IntervalOptions() {
  const [IsListOpen, setIsListOpen] = useState(false);
  const button = classNames(styles[`button`], {
    [styles["button--list-open"]]: IsListOpen,
  });
  const statisticsWeekAgo = useSelector<TInitialState, 0 | 1 | 2>(
    (state) => state.tasks.statisticsWeekAgo
  );
  const dispatch = useDispatch();

  const elements: Array<IIntervalOptionsElement> = [
    {
      text: "Эта неделя",
      weekAgo: 0,
      selected: true,
      click: () => {
        if (!IsListOpen) setIsListOpen(true);
        else {
          dispatch(changeStatisticsWeekAgo(0));
          setIsListOpen(false);
        }
      },
    },
    {
      text: "Прошедшая неделя",
      weekAgo: 1,
      selected: false,
      click: () => {
        if (!IsListOpen) setIsListOpen(true);
        else {
          dispatch(changeStatisticsWeekAgo(1));
          setIsListOpen(false);
        }
      },
    },
    {
      text: "2 недели назад",
      weekAgo: 2,
      selected: false,
      click: () => {
        if (!IsListOpen) setIsListOpen(true);
        else {
          dispatch(changeStatisticsWeekAgo(2));
          setIsListOpen(false);
        }
      },
    },
  ];

  const selected = elements.filter(
    (element) => element.weekAgo === statisticsWeekAgo
  );

  elements.sort((a, b) => {
    if (a.weekAgo === statisticsWeekAgo) return -1;
    else if (a.weekAgo < b.weekAgo && b.weekAgo !== statisticsWeekAgo)
      return -1;
    else return 1;
  });

  return (
    <ul className={styles.list}>
      {IsListOpen
        ? elements.map((element, index) => {
            return (
              <li key={index}>
                <button className={button} onClick={element.click}>
                  {element.text}
                </button>
              </li>
            );
          })
        : selected.map((element, index) => {
            return (
              <li key={index}>
                <button className={button} onClick={element.click}>
                  {element.text}
                </button>
              </li>
            );
          })}
    </ul>
  );
}
