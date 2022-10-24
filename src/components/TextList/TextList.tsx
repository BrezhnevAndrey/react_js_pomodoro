import React from "react";
import styles from "./textlist.less";

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
