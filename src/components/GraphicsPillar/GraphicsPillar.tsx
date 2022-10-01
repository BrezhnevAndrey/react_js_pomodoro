import React from "react";
import styles from "./graphicspillar.less";

interface IGraphicsPillar {
  height: number;
  text: string;
  active?: boolean;
}

export function GraphicsPillar({ height, text, active }: IGraphicsPillar) {
  return (
    <div className={styles.container}>
      <div
        className={active ? styles.pillar_active : styles.pillar}
        style={{ height: `${height}%` }}
      ></div>
      <div className={styles.text}>{text}</div>
    </div>
  );
}
