import React from "react";
import styles from "./actionslist.less";
import { ActionButton } from "./ActionButton/ActionButton";
import { ListItem } from "../ListItem/ListItem";

interface IActionItems {
  text: string;
  click: (...args: any) => void;
  imageIcon?: JSX.Element;
  IsActive?: boolean;
}

interface IActionsList {
  buttons: Array<IActionItems>;
}

export function ActionsList({ buttons }: IActionsList) {
  return (
    <ul className={styles.list}>
      {buttons.map((el, index) => (
        <ListItem key={index.toString()}>
          <ActionButton
            text={el.text}
            click={el.click}
            imageIcon={el.imageIcon}
            IsActive={el.IsActive}
          />
        </ListItem>
      ))}
    </ul>
  );
}
