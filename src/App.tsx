import { openDB } from "idb";
import "normalize.css";
import React from "react";
import Async from "react-async";
import { useDispatch } from "react-redux";
import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import { Header } from "./components/Header/Header";
import { Main } from "./components/Main/Main";
import { StatisticsContainer } from "./components/StatisticsContainer/StatisticsContainer";
import { UserOptions } from "./components/UserOptions";
import { IDBIOptions, IDBITasks, MyDBI } from "./store/indexedDB";
import { pushTasksReducer } from "./store/slice";
import {
  changeElementsId,
  dataToday,
  pushStatisticsReducer,
  TstatisticsElement,
} from "./store/statisticsSlice";
import {
  changeIsBlackTheme,
  changeIsSoundNotification,
  changeLongTimeoutDuration,
  changeLongTimeoutFrequency,
  changePomadoroDuration,
  changeShortTimeoutDuration,
} from "./store/userOptionsSlice";
import { today } from "./utilits/today";

export function App() {
  const dispatch = useDispatch();

  const defineId = (array: Array<TstatisticsElement>) => {
    const sortedArray = array.sort((a, b) => {
      if (a.date.year < b.date.year) return -1;
      else if (a.date.year > b.date.year) return 1;
      else {
        if (a.date.weekNumber < b.date.weekNumber) return -1;
        else if (a.date.weekNumber > b.date.weekNumber) return 1;
        else {
          if (a.date.weekday < b.date.weekday) return -1;
          if (a.date.weekday > b.date.weekday) return 1;
          else return 0;
        }
      }
    });
    if (array.length <= 20) {
      const id = array.length + 1;
      if (
        sortedArray[sortedArray.length - 1].date.locale !==
        today.toLocaleString()
      )
        dispatch(changeElementsId(id));
      return true;
    } else {
      const id = sortedArray[0].id;
      if (
        sortedArray[sortedArray.length - 1].date.locale !==
        today.toLocaleString()
      )
        dispatch(changeElementsId(id));
      return true;
    }
  };

  const data = async () => {
    const db = await openDB<MyDBI | IDBITasks | IDBIOptions>("pomadoro", 2, {
      upgrade(db) {
        db.createObjectStore("statistics", { keyPath: "id" });
        db.createObjectStore("tasks", { keyPath: "id" });
        db.createObjectStore("options", { keyPath: "id" });
      },
    });
    const statistics = await db.getAll(`statistics`);
    const tasks = await db.getAll("tasks");
    const options = await db.getAll("options");

    tasks[0] &&
      tasks[0].value.length > 0 &&
      dispatch(pushTasksReducer(tasks[0].value));

    statistics.length === 0 && statistics.push(dataToday[0]);
    dispatch(pushStatisticsReducer(statistics)) && defineId(statistics);

    if (options[0]) {
      dispatch(
        changePomadoroDuration(options[0].options.userOptions.pomadoroDuration)
      );
      dispatch(
        changeShortTimeoutDuration(
          options[0].options.userOptions.shortTimeoutDuration
        )
      );
      dispatch(
        changeLongTimeoutDuration(
          options[0].options.userOptions.longTimeoutDuration
        )
      );
      dispatch(
        changeLongTimeoutFrequency(
          options[0].options.userOptions.longTimeoutFrequency
        )
      );
      dispatch(
        changeIsSoundNotification(
          options[0].options.userOptions.IsSoundNotification
        )
      );
      dispatch(changeIsBlackTheme(options[0].options.userOptions.IsBlackTheme));
    }
    return { statistics, tasks, options };
  };

  return (
    <Async promiseFn={data}>
      {({ data, error, isPending }) => {
        if (isPending) return "Loading...";
        if (data)
          return (
            <HashRouter>
              <Header />
              <Routes>
                <Route
                  path="/"
                  element={<Navigate to="/index.html" replace />}
                />
                <Route path="/index.html" element={<Main />} />
                <Route path="/statistics" element={<StatisticsContainer />} />
                <Route path="/userOptions" element={<UserOptions />} />
              </Routes>
            </HashRouter>
          );
        if (error) console.log("Ошибка");
      }}
    </Async>
  );
}
