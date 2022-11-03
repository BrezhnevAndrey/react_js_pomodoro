import React from "react";
import styles from "./framebutton.less";

interface IFrameButton {
  click: () => any;
  text?: string;
  imageIcon?: JSX.Element;
  anyClass?: string;
  disabled?: boolean;
}

export function FrameButton({ click, text, imageIcon, anyClass, disabled }: IFrameButton) {
  return (
    <button disabled={disabled} className={anyClass} onClick={click}>
      {imageIcon}
      {text}
    </button>
  );
}
