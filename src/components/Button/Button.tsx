import React from "react";
import styles from "./button.less";
import classNames from "classnames";

interface IButton {
  text: string;
  style: "green" | "red";
  click?: () => void;
  disabled?: boolean;
}

export function Button({ text, style, click, disabled }: IButton) {
  const classesBtn = classNames(styles["button"], styles[`button--${style}`]);
  return (
    <button onClick={click} disabled={disabled} className={classesBtn}>
      {text}
    </button>
  );
}
