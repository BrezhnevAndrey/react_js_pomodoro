import React from "react";
import styles from "./textlist.less";

export const items = [
  "Выберите категорию и напишите название текущей задачи",
  "Запустите таймер («помидор»)",
  "Работайте пока «помидор» не прозвонит",
  "Сделайте короткий перерыв (3-5 минут)",
  "Продолжайте работать «помидор» за «помидором», пока задача не будут выполнена",
  "Каждые 4 «помидора» делайте длинный перерыв (15-30 минут)",
];

interface ITextList {
  title?: string;
  items: Array<string>;
}

export function TextList({ title, items }: ITextList) {
  return (
    <div>
      {title && <h3 className={styles.title}>{title}</h3>}
      <ul className={styles.list}>
        {items.map((el, index) => (
          <li className={styles.item} key={index}>
            {el}
          </li>
        ))}
      </ul>
    </div>
  );
}
