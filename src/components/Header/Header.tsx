import React from "react";
import { HeaderButton } from "../HeaderButton/HeaderButton";
import { Logo } from "../Logo/Logo";
import styles from "./header.less";

export function Header() {
  return (
    <div className={styles.header}>
      <Logo />
      <HeaderButton text={"Статистика"} />
    </div>
  );
}
