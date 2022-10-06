import React from "react";
import { StatisticsButton } from "../StatisticsButton/StatisticsButton";
import { Logo } from "../Logo/Logo";
import styles from "./header.less";

export function Header() {
  return (
    <div className={styles.header}>
      <Logo />
      <StatisticsButton text={"Статистика"} />
    </div>
  );
}
