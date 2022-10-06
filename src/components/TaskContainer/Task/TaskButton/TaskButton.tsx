import React from "react";
import styles from "./taskbutton.less";
import ImageIcon from "../../../../images/svg/points.svg";
import { FrameButton } from "../../../FrameButton";

interface ITaskButton {
  click: () => void;
}

export function TaskButton({ click }: ITaskButton) {
  return (
    <FrameButton
      click={click}
      imageIcon={<ImageIcon />}
      anyClass={styles.button}
    />
  );
}
