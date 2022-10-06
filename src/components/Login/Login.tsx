import React from "react";
import { BigLogo } from "../BigLogo/BigLogo";
import { LoginForm } from "../LoginForm/LoginForm";
import styles from "./login.less";

export function Login() {
  return (
    <div className={styles.container}>
      <BigLogo />
      <LoginForm click={() => {}} submit={() => {}} />
    </div>
  );
}
