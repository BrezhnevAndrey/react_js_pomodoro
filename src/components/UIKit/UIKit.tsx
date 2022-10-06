import React from "react";
import { ActionsList } from "../ActionsList";
import { Button } from "../Button";
import { GraphicsPillar } from "../GraphicsPillar";
import { StatisticsButton } from "../StatisticsButton";
import { OpenButton } from "../OpenButton";
import styles from "./uikit.less";

export function UIKit() {
  return (
    <div>
      <Button text="Кнопка" style="green" />
      <Button text="Кнопка" style="red" />
      {/* <ActionsList /> */}
      <GraphicsPillar height={50} text={"ПН"} />
      <GraphicsPillar height={35} text={"ПН"} active={true} />
      <StatisticsButton text={"Статистика"} />
      <OpenButton />
    </div>
  );
}
