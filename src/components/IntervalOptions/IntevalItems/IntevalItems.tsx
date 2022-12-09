import React from "react";
import styles from "./intevalitems.less";

interface IIntervalItems {
  text: string;
  weekAgo: 1 | 2 | 3;
  selected: boolean;
}

export function IntevalItems({ text, weekAgo, selected }: IIntervalItems) {
  return <li className={styles.item}>{text}</li>;
}
