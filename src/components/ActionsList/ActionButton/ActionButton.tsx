import React from "react";
import { FrameButton } from "../../FrameButton/FrameButton";
import styles from "./actionButton.less";

interface IActionButton {
  text: string;
  imageIcon?: React.ReactElement;
  click: () => void;
}

export function ActionButton({ text, imageIcon, click }: IActionButton) {
  return (
    <FrameButton
      text={text}
      click={click}
      imageIcon={imageIcon}
      anyClass={styles.button}
    />
  );
}
