import React from "react";
import { StatisticsButton } from "../StatisticsButton/StatisticsButton";
import { Logo } from "../Logo/Logo";
import styles from "./header.less";
import { Link } from "react-router-dom";


export function Header() {
  return (
    <div className={styles.header}>
      <Link to="/">
        <Logo />
      </Link>
      <Link to="statistics">
        <StatisticsButton text={"Статистика"} />
      </Link>
    </div>
  );
}
