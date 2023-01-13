import classNames from "classnames";
import React from "react";
import { useSelector } from "react-redux";
import { IUserOptions } from "../../store/userOptionsSlice";
import { ContentContainer } from "../ContentContainer/ContentContainer";
import { TimerContainer } from "../TimerContainer/TimerContainer";
import styles from "./main.less";

export function Main() {
  const IsBlackTheme = useSelector<IUserOptions, boolean>(
    (state) => state.userOptions.IsBlackTheme
  );
  const mainClass = classNames(styles["container"], {
    [styles["blackTheme"]]: IsBlackTheme,
  });
  return (
    <div className={mainClass}>
      <ContentContainer />
      <TimerContainer />
    </div>
  );
}
