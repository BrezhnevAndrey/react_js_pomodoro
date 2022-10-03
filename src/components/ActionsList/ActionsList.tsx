import React from "react";
import styles from "./actionslist.less";
import { ActionButton } from "./ActionButton/ActionButton";
import PlusImg from "../../images/svg/plus.svg";
import MinusImg from "../../images/svg/minus.svg";
import EditImg from "../../images/svg/edit.svg";
import BasketImg from "../../images/svg/basket.svg";

export function ActionsList() {
  return (
    <ul className={styles.list}>
      <li>
        <ActionButton
          text="Увеличить"
          imageIcon={<PlusImg />}
          click={() => {}}
        />
      </li>
      <li>
        <ActionButton
          text="Уменьшить"
          imageIcon={<MinusImg />}
          click={() => {}}
          IsActive={false}
        />
      </li>
      <li>
        <ActionButton
          text="Редактировать"
          imageIcon={<EditImg />}
          click={() => {}}
        />
      </li>
      <li>
        <ActionButton
          text="Удалить"
          imageIcon={<BasketImg />}
          click={() => {}}
        />
      </li>
    </ul>
  );
}
