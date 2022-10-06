import React from "react";
import { FrameButton } from "../../FrameButton/FrameButton";
import styles from "./actionButton.less";

interface IActionButton {
  text: string;
  imageIcon?: JSX.Element;
  IsActive?: boolean;
  click: () => void;
}

export function ActionButton({
  text,
  imageIcon,
  click,
  IsActive = true,
}: IActionButton) {
  return (
    <FrameButton
      text={text}
      click={click}
      imageIcon={imageIcon}
      anyClass={
        IsActive ? styles.button : styles.button_disabled + " " + styles.button
      }
    />
  );
}
