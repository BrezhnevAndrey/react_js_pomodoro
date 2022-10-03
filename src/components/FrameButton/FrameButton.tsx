import React from "react";
import styles from "./framebutton.less";

interface IFrameButton {
  text?: string;
  imageIcon?: React.ReactElement;
  anyClass?: string;
  click: () => any;
}

export function FrameButton({ text, imageIcon, anyClass, click }: IFrameButton) {
  return (
    <button className={anyClass} onClick={click}>
      {imageIcon}
      {text}
    </button>
  );
}
