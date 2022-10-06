import React from "react";
import { FrameButton } from "../FrameButton/FrameButton";
import styles from "./cancelbutton.less";

interface ICancelButton {
  click: () => void;
}

export function CancelButton({ click }: ICancelButton) {
  return (
    <FrameButton click={click} text={"Отмена"} anyClass={styles.button} />
  );
}
