import React from "react";
import "normalize.css";
import { Header } from "./components/Header/Header";
import { Main } from "./components/Main/Main";
import { UIKit } from "./components/UIKit/UIKit";
import { Login } from "./components/Login/Login";

export function App() {
  return (
    <div>
      <Header />
      <Main />
    </div>
  );
}
