import React from "react";
import styles from "./informationelement.less";

interface IInformationElement {
  type: "Фокус" | "Время на паузе" | "Остановки";
  data: string;
  image: string | React.ReactElement;
}

export function InformationElement({ type, data, image }: IInformationElement) {
  return (
    <div className={styles.container}>
      <div>
        <h3 className={styles.subtitle}>{type}</h3>
        <div className={styles.value}>{data}</div>
      </div>
      <div>{image}</div>
    </div>
  );
}
