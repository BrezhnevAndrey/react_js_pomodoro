import React from "react";
import styles from "./statisticsbutton.less";
import ImageIcon from "../../images/svg/graph.svg";
import { FrameButton } from "../FrameButton/FrameButton";

interface IStatisticsButton {
  text: string;
  click: () => void;
}

export function StatisticsButton({ text, click }: IStatisticsButton) {
  return (
    <FrameButton
      text={text}
      imageIcon={<ImageIcon />}
      click={click}
      anyClass={styles.button}
    />
  );
}
