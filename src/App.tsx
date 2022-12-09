import React, { useEffect } from "react";
import "normalize.css";
import { Header } from "./components/Header/Header";
import { Main } from "./components/Main/Main";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { StatisticsContainer } from "./components/StatisticsContainer/StatisticsContainer";
import { pushTasksReducer } from "./store/slice";
import { tasks } from "./components/TaskContainer/TaskContainer";
import { useDispatch } from "react-redux";

export function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(pushTasksReducer(tasks));
  }, []);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <Main />
            </div>
          }
        />
        <Route
          path="/statistics"
          element={
            <div>
              <StatisticsContainer />
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
