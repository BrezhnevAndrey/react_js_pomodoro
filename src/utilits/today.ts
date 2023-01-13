import { DateTime } from "luxon";
import { TstatisticsElement } from "../store/statisticsSlice";
import { faker } from "@faker-js/faker";

export const today = DateTime.now();

export const createDateFormat = (date: DateTime) => {
  return {
    dayName: date.weekdayLong,
    day: date.day,
    month: date.month,
    year: date.year,
    weekNumber: date.weekNumber,
    weekday: date.weekday,
    locale: date.toLocaleString(),
  };
};

export const testFirstElement: TstatisticsElement = {
  date: {
    dayName: today.weekdayLong,
    day: today.day,
    month: today.month,
    year: today.year,
    weekNumber: today.weekNumber,
    weekday: today.weekday,
    locale: today.toLocaleString(),
  },
  value: {
    timeToComplite: faker.datatype.number({ max: 15000 }),
    workingTime: faker.datatype.number({ max: 36000 }),
    pauseTime: faker.datatype.number({ max: 7200 }),
    pauseCounter: faker.datatype.number({ max: 10 }),
    finishedPomadoro: faker.datatype.number({ max: 10 }),
    activeTaskCounter: faker.datatype.number({ max: 10 }),
    timeoutCounter: faker.datatype.number({ max: 10 }),
  },
  id: 1,
};

const testCreate = () => {
  let day = DateTime.now();
  const array: Array<TstatisticsElement> = [];
  array.push(testFirstElement);

  for (let i = 0; i <= 19; i++) {
    day = day.minus({ day: 1 });
    array.unshift({
      date: {
        dayName: day.weekdayLong,
        day: day.day,
        month: day.month,
        year: day.year,
        weekNumber: day.weekNumber,
        weekday: day.weekday,
        locale: day.toLocaleString(),
      },
      value: {
        timeToComplite: faker.datatype.number({ max: 15000 }),
        workingTime: faker.datatype.number({ max: 36000 }),
        pauseTime: faker.datatype.number({ max: 7200 }),
        pauseCounter: faker.datatype.number({ max: 10 }),
        finishedPomadoro: faker.datatype.number({ max: 10 }),
        activeTaskCounter: faker.datatype.number({ max: 10 }),
        timeoutCounter: faker.datatype.number({ max: 10 }),
      },
      id: i + 2,
    });
  }

  return array;
};

export const test = testCreate();

export const emptyDay: TstatisticsElement = {
  date: {
    dayName: today.minus({ day: 1000 }).weekdayLong,
    day: today.minus({ day: 1000 }).day,
    month: today.minus({ day: 1000 }).month,
    year: today.minus({ day: 1000 }).year,
    weekNumber: today.minus({ day: 1000 }).weekNumber,
    weekday: today.minus({ day: 1000 }).weekday,
    locale: today.minus({ day: 1000 }).toLocaleString(),
  },
  value: {
    timeToComplite: 0,
    workingTime: 0,
    pauseTime: 0,
    pauseCounter: 0,
    finishedPomadoro: 0,
    activeTaskCounter: 1,
    timeoutCounter: 1,
  },
  id: 0,
};
