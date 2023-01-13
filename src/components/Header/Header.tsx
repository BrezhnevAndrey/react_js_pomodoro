import React, { useEffect } from "react";
import { StatisticsButton } from "../StatisticsButton/StatisticsButton";
import { Logo } from "../Logo/Logo";
import styles from "./header.less";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { IUserOptions } from "../../store/userOptionsSlice";
import classNames from "classnames";

export function Header() {
  const IsBlackTheme = useSelector<IUserOptions, boolean>(
    (state) => state.userOptions.IsBlackTheme
  );
  const headerClass = classNames(styles["header"], {
    [styles["blackTheme"]]: IsBlackTheme,
  });
  return (
    <div className={headerClass}>
      <Link to="/">
        <Logo />
      </Link>
      <Link className={styles.options} to="userOptions">
        Опции
      </Link>
      <Link to="statistics">
        <StatisticsButton text={"Статистика"} />
      </Link>
    </div>
  );
}
