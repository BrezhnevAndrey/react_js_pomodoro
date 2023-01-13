import { DBSchema, openDB } from "idb";
import { emptyTask } from "./slice";
import { dataToday, TstatisticsElement } from "./statisticsSlice";
import { IUserOptions } from "./userOptionsSlice";

export interface MyDBI extends DBSchema {
  statistics: {
    key: string;
    value: TstatisticsElement;
  };
}

export interface IDBITasks extends DBSchema {
  tasks: {
    key: string;
    value: {
      id: number;
      array: Array<ITasks>;
    };
  };
}

export interface IDBIOptions extends DBSchema {
  options: {
    key: string;
    value: {
      id: number;
      options: IUserOptions;
    };
  };
}

export interface ITasks {
  taskName: string;
  amount: number;
  timeLeft: number;
  pomadoroCounter: number;
}

export const getDBData = async () => {
  const db = await openDB<MyDBI>("pomadoro", undefined, {
    upgrade(db) {
      db.createObjectStore("statistics");
    },
  });
  const result = await db.getAll(`statistics`);
  if (result.length === 0) result.push(dataToday[0]);
  return result;
};

export const changeDBData = async (dataFromToday: TstatisticsElement) => {
  const db = await openDB<MyDBI>("pomadoro", undefined);
  const tx = db.transaction("statistics", "readwrite");
  const store = tx.objectStore("statistics");
  await store.put(dataFromToday);
};

export const getTasksFromDB = async () => {
  const db = await openDB<IDBITasks>("pomadoro", undefined, {
    upgrade(db) {
      db.createObjectStore("tasks");
    },
  });
  const result = await db.getAll("tasks");
  if (result[0].array.length === 0) result[0].array.push(emptyTask);
  return result[0];
};

export const changeTasksFromDB = async (tasks: Array<ITasks>) => {
  const db = await openDB<IDBITasks>("pomadoro", undefined);
  const tx = db.transaction("tasks", "readwrite");
  const store = tx.objectStore("tasks");
  const result = () => {
    return {
      id: 1,
      array: tasks,
    };
  };
  const array = result();
  await store.put(array);
};

export const changeOptionsFromDB = async (options: IUserOptions) => {
  const db = await openDB<IDBIOptions>("pomadoro", undefined);
  const tx = db.transaction("options", "readwrite");
  const store = tx.objectStore("options");
  await store.put({ id: 1, options: options });
};
