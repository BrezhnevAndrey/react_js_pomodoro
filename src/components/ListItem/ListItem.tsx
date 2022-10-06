import React from "react";
import styles from "./listitem.less";

interface IListItem {
  children: React.ReactElement;
  key: string;
  classes?: string | undefined;
}

export function ListItem({ children, classes }: IListItem) {
  return <li className={classes}>{children}</li>;
}
