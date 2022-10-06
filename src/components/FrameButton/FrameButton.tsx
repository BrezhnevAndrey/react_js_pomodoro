import React from "react";
import styles from "./framebutton.less";

interface IFrameButton {
  click: () => any;
  text?: string;
  imageIcon?: JSX.Element;
  anyClass?: string;
}

export function FrameButton({ text, imageIcon, anyClass, click }: IFrameButton) {
  return (
    <button className={anyClass} onClick={click}>
      {imageIcon}
      {text}
    </button>
  );
}
