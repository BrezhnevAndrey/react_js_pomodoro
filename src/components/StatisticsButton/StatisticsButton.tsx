import React from "react";
import styles from "./statisticsbutton.less";
import ImageIcon from "../../images/svg/graph.svg";
import { FrameButton } from "../FrameButton/FrameButton";

interface IStatisticsButton {
  text: string;
}

export function StatisticsButton({ text }: IStatisticsButton) {
  return (
    <FrameButton
      text={text}
      imageIcon={<ImageIcon />}
      click={() => {}}
      anyClass={styles.button}
    />
  );
}
