import React from "react";
import { FrameButton } from "../FrameButton/FrameButton";
import styles from "./addtimebutton.less";
import ImageIcon from "../../images/svg/open.svg";

interface IAddtimebutton {
  click: () => void;
  disabled?: boolean;
}

export function AddTimeButton({ click, disabled }: IAddtimebutton) {
  return (
    <FrameButton
      click={click}
      imageIcon={<ImageIcon />}
      anyClass={styles.button}
      disabled={disabled}
    />
  );
}
