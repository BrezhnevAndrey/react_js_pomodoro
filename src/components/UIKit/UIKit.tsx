import React from "react";
import { Button } from "../Button";
import { StatisticsButton } from "../StatisticsButton";
import { AddTimeButton } from "../AddTimeButton";

export function UIKit() {
  return (
    <div>
      <Button text="Кнопка" style="green" />
      <Button text="Кнопка" style="red" />
      <StatisticsButton text={"Статистика"} />
      <AddTimeButton click={() => {}} />
    </div>
  );
}
