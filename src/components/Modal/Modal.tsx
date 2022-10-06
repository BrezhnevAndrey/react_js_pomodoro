import React from "react";
import { Button } from "../Button/Button";
import { CancelButton } from "../CancelButton/CancelButton";
import { CloseButton } from "../CloseButton/CloseButton";
import styles from "./modal.less";

interface IModal {
  click: () => void;
  cancelClick: () => void;
  title?: string;
}

export function Modal({ title, click, cancelClick }: IModal) {
  return (
    <div className={styles.modal}>
      <div className={styles.container}>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.btnContainer}>
          <CloseButton click={cancelClick} />
          <Button text={"Удалить"} style={"red"} click={click} />
          <CancelButton click={cancelClick} />
        </div>
      </div>
    </div>
  );
}
