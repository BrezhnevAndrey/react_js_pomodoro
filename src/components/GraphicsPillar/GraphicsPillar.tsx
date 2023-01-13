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
  Chart,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import {
  changeActiveIndex,
  TstatisticsElement,
  TStatisticsState,
} from "../../store/statisticsSlice";
import { TInitialState } from "../../store/slice";
import { emptyDay, today } from "../../utilits/today";

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

  const days = [
    "понедельник",
    "вторник",
    "среда",
    "четверг",
    "пятница",
    "суббота",
    "воскресенье",
  ];

  const chartData = statistics.filter((element) => {
    return element.date.weekNumber === today.weekNumber - statisticsWeekAgo;
  });

  const fullData: Array<TstatisticsElement> = days.map((day) => {
    const h = chartData.some((el) => el.date.dayName === day);
    if (!h) return emptyDay;
    else {
      const res = chartData.filter(
        (el) => el.date.year + 1 >= today.year && el.date.dayName === day
      );
      return res[0];
    }
  });

  const data = {
    labels,
    datasets: [
      {
        data: fullData.map((el) => el.value.workingTime / 3600),
        backgroundColor: `#ea8979`,
      },
    ],
  };

  const onClick = (event: any) => {
    {
      if (chartRef.current) {
        const chart = Chart.getChart(chartRef.current);
        const clickedElements = chart!.getElementsAtEventForMode(
          event,
          "x",
          { axis: "x", intersect: false },
          true
        );
        if (!clickedElements[0]) return;
        const element = fullData[clickedElements[0].index];
        dispatch(changeActiveIndex(element));
      }
    }
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
