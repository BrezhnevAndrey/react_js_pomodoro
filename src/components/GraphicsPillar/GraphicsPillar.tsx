import React, { useRef } from "react";
import styles from "./graphicspillar.less";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, getElementAtEvent } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import {
  changeActiveIndex,
  TstatisticsElement,
  TStatisticsState,
} from "../../store/statisticsSlice";
import { TInitialState } from "../../store/slice";
import { today } from "../../utilits/today";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

ChartJS.defaults.backgroundColor = "#9BD0F5";

export function GraphicsPillar() {
  const dispatch = useDispatch();
  const chartRef = useRef<any>(null);

  const fontSizeX = 24;
  const paddingX = 11;

  const statistics = useSelector<TStatisticsState, Array<TstatisticsElement>>(
    (state) => state.statistics.dataset
  );

  const statisticsWeekAgo = useSelector<TInitialState, number>(
    (state) => state.tasks.statisticsWeekAgo
  );

  const plugins: any = [
    {
      beforeDraw(chart: any, _: any, options: any) {
        const { ctx } = chart;
        ctx.save();
        ctx.setLineDash(options.borderDash || []);
        ctx.lineDashOffset = options.borderDashOffset;
        ctx.fillStyle = "#f4f4f4";
        ctx.fillRect(
          0,
          0,
          chart.width,
          chart.height - (Math.round(fontSizeX * 1.2) + (paddingX + 1) * 2 + 6)
        );
        ctx.restore();
      },
    },
  ];

  const options = {
    layout: {
      padding: {
        right: 20,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
          borderColor: "transparent",
        },
        ticks: {
          padding: paddingX,
          color: "#999999",
          font: {
            size: fontSizeX,
          },
        },
      },

      y: {
        grid: {
          tickLength: 32,
          tickColor: "transparent",
          borderColor: "transparent",
        },
        min: 0,
        max: 10,
        position: "right" as const,
        ticks: {
          font: {
            size: 12,
          },
          color: "#333333",
          stepSize: 1,
          callback: function (value: any, index: number, array: any[]) {
            if (index === 0 || index === array.length - 1) return;
            return value + " ч";
          },
        },
      },
    },
  };

  const labels = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

  const chartData = statistics.filter((element, index) => {
    console.log(statistics);
    return element.date.weekNumber === today.weekNumber - statisticsWeekAgo;
  });

  // while (chartData.length < 7) {
  //   chartData.push({
  //     date: {
  //       dayName: today.weekdayLong,
  //       day: today.day,
  //       month: today.month,
  //       year: today.year,
  //       weekNumber: today.weekNumber,
  //       weekday: today.weekday,
  //       locale: today.toLocaleString(),
  //     },
  //     value: {
  //       workingTime: 0,
  //       pauseTime: 0,
  //       pauseCounter: 0,
  //       finishedPomadoro: 0,
  //       activeTaskCounter: 1,
  //       timeoutCounter: 1,
  //     },
  //   });
  // }

  const data = {
    labels,
    datasets: [
      {
        data: chartData.map((el) => el.value.workingTime / 3600),
        backgroundColor: `#ea8979`,
      },
    ],
  };

  console.log(data, options);

  const onClick = (event: any) => {
    console.log(chartData, getElementAtEvent(chartRef.current, event)[0].index);
    dispatch(
      changeActiveIndex(
        14 -
          statisticsWeekAgo * 7 +
          getElementAtEvent(chartRef.current, event)[0].index +
          7 -
          today.weekday
      )
    );
  };

  return (
    <Bar
      onClick={onClick}
      ref={chartRef}
      className={styles.bar}
      options={options}
      data={data}
      plugins={plugins}
    />
  );
}
