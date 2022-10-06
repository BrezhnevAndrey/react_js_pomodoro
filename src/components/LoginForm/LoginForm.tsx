import React from "react";
import { Button } from "../Button/Button";
import { InputText } from "../InputText/InputText";
import styles from "./loginform.less";

interface ILoginForm {
  click: () => void;
  submit: () => void;
}

export function LoginForm({ click, submit }: ILoginForm) {
  return (
    <form className={styles.form} onSubmit={submit}>
      <h3 className={styles.title}>Совсем чуть-чуть и можем начинать!</h3>
      <InputText />
      <InputText />
      <Button style="green" click={click} text="Зарегистрироваться" />
      <div className={styles.container}>
        <input type="checkbox" id="loginCheckbox" />
        <label htmlFor="loginCheckbox">
          Согласен на обработку персональных данных
        </label>
      </div>
    </form>
  );
}
