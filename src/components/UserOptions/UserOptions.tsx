import classNames from "classnames";
import React, { ChangeEvent, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeOptionsFromDB } from "../../store/indexedDB";
import {
  changeIsBlackTheme,
  changeIsSoundNotification,
  changeLongTimeoutDuration,
  changeLongTimeoutFrequency,
  changePomadoroDuration,
  changeShortTimeoutDuration,
  IUserOptions,
} from "../../store/userOptionsSlice";
import styles from "./useroptions.less";

export function UserOptions() {
  const dispatch = useDispatch();
  const pomadoroDuration = useSelector<IUserOptions, number>(
    (state) => state.userOptions.pomadoroDuration
  );
  const shortTimeoutDuration = useSelector<IUserOptions, number>(
    (state) => state.userOptions.shortTimeoutDuration
  );
  const longTimeoutDuration = useSelector<IUserOptions, number>(
    (state) => state.userOptions.longTimeoutDuration
  );
  const longTimeoutFrequency = useSelector<IUserOptions, number>(
    (state) => state.userOptions.longTimeoutFrequency
  );
  const IsSoundNotification = useSelector<IUserOptions, boolean>(
    (state) => state.userOptions.IsSoundNotification
  );
  const IsBlackTheme = useSelector<IUserOptions, boolean>(
    (state) => state.userOptions.IsBlackTheme
  );

  const optionsClass = classNames(styles["container"], {
    [styles["blackTheme"]]: IsBlackTheme,
  });

  const ref = useRef<HTMLFormElement>(null);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value) * 60;
    switch (event.target.name) {
      case "pomadoroDuration":
        dispatch(changePomadoroDuration(value));
        break;
      case "shortTimeoutDuration":
        dispatch(changeShortTimeoutDuration(value));
        break;
      case "longTimeoutDuration":
        dispatch(changeLongTimeoutDuration(value));
        break;
      case "longTimeoutFrequency":
        dispatch(changeLongTimeoutFrequency(Number(event.target.value)));
        break;
      case "IsSoundNotification":
        const IsSound = event.target.checked ? true : false;
        dispatch(changeIsSoundNotification(IsSound));
        break;
      case "IsBlackTheme":
        const IsBlack = event.target.checked ? true : false;
        dispatch(changeIsBlackTheme(IsBlack));
        break;
    }
  };

  const formClick = (event: React.FormEvent) => {
    event.preventDefault();

    const getValue = (name: string) => {
      const element = ref.current?.elements.namedItem(name);
      if (element instanceof HTMLInputElement) {
        if (element.type === "checkbox") return element.checked;
        else return element.value;
      }
    };

    const obj = () => {
      return {
        userOptions: {
          pomadoroDuration: Number(getValue("pomadoroDuration")) * 60,
          shortTimeoutDuration: Number(getValue("shortTimeoutDuration")) * 60,
          longTimeoutDuration: Number(getValue("longTimeoutDuration")) * 60,
          longTimeoutFrequency: Number(getValue("longTimeoutFrequency")),
          IsSoundNotification: Boolean(getValue("IsSoundNotification")),
          IsBlackTheme: Boolean(getValue("IsBlackTheme")),
        },
      };
    };

    const res = obj();
    changeOptionsFromDB(res);
  };

  const onClick = (event: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    dispatch(changePomadoroDuration(1500));
    dispatch(changeShortTimeoutDuration(300));
    dispatch(changeLongTimeoutDuration(900));
    dispatch(changeLongTimeoutFrequency(4));
    dispatch(changeIsSoundNotification(true));
    dispatch(changeIsBlackTheme(false));
  };

  return (
    <form ref={ref} onSubmit={formClick} className={optionsClass}>
      <h3>
        Настройки применяются автоматически, чтобы сохранить настройки между
        сессиями нажмите "Сохранить настройки".
        Значения применяются только к новым задачам.
      </h3>
      <div className={styles.inputs}>
        <div>
          <label htmlFor="pomadoroDuration">
            Длительность помидора (минут)
          </label>
          <input
            type="text"
            id="pomadoroDuration"
            name="pomadoroDuration"
            value={pomadoroDuration / 60}
            onChange={onChange}
          />
        </div>

        <div>
          <label htmlFor="shortTimeoutDuration">
            Длительность короткого перерыва (минут)
          </label>
          <input
            type="text"
            id="shortTimeoutDuration"
            name="shortTimeoutDuration"
            value={shortTimeoutDuration / 60}
            onChange={onChange}
          />
        </div>

        <div>
          <label htmlFor="longTimeoutDuration">
            Длительность длинного перерыва (минут)
          </label>
          <input
            type="text"
            id="longTimeoutDuration"
            name="longTimeoutDuration"
            value={longTimeoutDuration / 60}
            onChange={onChange}
          />
        </div>

        <div>
          <label htmlFor="longTimeoutFrequency">
            Частота длинного перерыва (каждый n-ый перерыв будет длинным [от 1
            до 10])
          </label>
          <input
            type="text"
            id="longTimeoutFrequency"
            name="longTimeoutFrequency"
            value={longTimeoutFrequency}
            onChange={onChange}
          />
        </div>

        <div>
          <label htmlFor="IsSoundNotification">
            Использовать звуковое уведомаление
          </label>
          <input
            type="checkbox"
            id="IsSoundNotification"
            name="IsSoundNotification"
            checked={IsSoundNotification}
            onChange={onChange}
          />
        </div>
        <div>
          <label htmlFor="theme">Использовать тёмную тему</label>
          <input
            type="checkbox"
            id="IsBlackTheme"
            name="IsBlackTheme"
            checked={IsBlackTheme}
            onChange={onChange}
          />
        </div>
      </div>
      <input
        type="submit"
        value={"Сохранить настройки"}
        className={styles.btnInput}
      />
      <input
        type="button"
        value={"Восстановить значение по умолчанию"}
        onClick={onClick}
        className={styles.btnInput}
      />
    </form>
  );
}
