import React from "react";
import { Button } from "../Button";
import { GraphicsPillar } from "../GraphicsPillar";
import { StatisticsButton } from "../StatisticsButton";
import { AddTimeButton } from "../AddTimeButton";

export function UIKit() {
  return (
    <div>
      <Button text="Кнопка" style="green" />
      <Button text="Кнопка" style="red" />
      <GraphicsPillar height={50} text={"ПН"} />
      <GraphicsPillar height={35} text={"ПН"} active={true} />
      <StatisticsButton text={"Статистика"} />
      <AddTimeButton click={() => {}} />
    </div>
  );
}
