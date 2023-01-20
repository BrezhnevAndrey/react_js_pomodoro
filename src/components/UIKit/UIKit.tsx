import React from "react";
import { Button } from "../Button";
import { AddTimeButton } from "../AddTimeButton";

export function UIKit() {
  return (
    <div>
      <Button text="Кнопка" style="green" />
      <Button text="Кнопка" style="red" />
      <AddTimeButton click={() => {}} />
    </div>
  );
}
