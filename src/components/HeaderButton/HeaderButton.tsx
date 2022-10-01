import React from "react";
import styles from "./headerbutton.less";
import ImageIcon from "../../images/svg/graph.svg";
import { FrameButton } from "../FrameButton/FrameButton";

interface IHeaderButton {
  text: string;
}

export function HeaderButton({ text }: IHeaderButton) {
  return (
    <FrameButton
      text={text}
      imageIcon={<ImageIcon />}
      click={() => {}}
      anyClass={styles.button}
    />
  );
}
