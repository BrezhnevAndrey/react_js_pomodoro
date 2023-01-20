import React from "react";
import { Logo } from "../Logo/Logo";
import styles from "./header.less";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { IUserOptions } from "../../store/userOptionsSlice";
import classNames from "classnames";
import { FrameButton } from "../FrameButton";
import { StatisticsButton } from "../StatisticsButton/StatisticsButton";
import { changeIsPaused } from "../../store/timerSlice";

export function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const IsBlackTheme = useSelector<IUserOptions, boolean>(
    (state) => state.userOptions.IsBlackTheme
  );
  const headerClass = classNames(styles["header"], {
    [styles["blackTheme"]]: IsBlackTheme,
  });
  return (
    <div className={headerClass}>
      <FrameButton
        click={() => {
          dispatch(changeIsPaused(false)) && navigate("/");
        }}
        imageIcon={<Logo />}
        anyClass={styles.logoBtn}
      />
      <FrameButton
        click={() => {
          const answer = confirm("При этом действии включиться пауза");
          answer && dispatch(changeIsPaused(true)) && navigate("/userOptions");
        }}
        text={"Опции"}
        anyClass={styles.logoBtn}
      />
      <StatisticsButton
        text={"Опции"}
        click={() => {
          const answer = confirm("При этом действии включиться пауза");
          answer && dispatch(changeIsPaused(true)) && navigate("/statistics");
        }}
      />
    </div>
  );
}
