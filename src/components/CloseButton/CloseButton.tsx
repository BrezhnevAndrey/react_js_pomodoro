import React from "react";
import { FrameButton } from "../FrameButton/FrameButton";
import styles from "./closebutton.less";

interface ICloseButton {
  click: () => void;
}

export function CloseButton({ click }: ICloseButton) {
  return <FrameButton click={click} anyClass={styles.button} />;
}
