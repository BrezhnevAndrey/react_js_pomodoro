import React from "react";
import { FrameButton } from "../FrameButton/FrameButton";
import styles from "./openbutton.less";
import ImageIcon from "../../images/svg/open.svg";

export function OpenButton() {
  return (
    <FrameButton
      click={() => {}}
      imageIcon={<ImageIcon />}
      anyClass={styles.button}
    />
  );
}
