"use client";

import React from "react";
import dynamic from "next/dynamic";
import { useTheme } from "next-themes";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface InterestChartProps {
  data: number[];
  categories: number[];
}

const InterestChart: React.FC<InterestChartProps> = ({ data, categories }) => {
  const { theme } = useTheme();

  const labelColor = theme === "light" ? "#000000" : "#FFFFFF";

  const chartOptions = {
    chart: {
      id: "interest-chart",
      height: 350,
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      categories,
      title: {
        text: "Meses",
        style: {
          color: labelColor, 
        },
      },
      labels: {
        style: {
          colors: labelColor, 
        },
      },
    },
    yaxis: {
      title: {
        text: "Importe (€)",
        style: {
          color: labelColor, 
        },
      },
      labels: {
        style: {
          colors: labelColor, 
        },
      },
    },
    colors: ["#6366F1"],
    tooltip: {
      theme: theme,
    },
    grid: {
      show: false,
    },
    stroke: {
      width: 3, // Ajusta el grosor de la línea
    },
  };

  return (
    <div className="">
      <Chart
        type="line"
        series={[
          {
            name: "Beneficio acumulado (€)",
            data,
          },
        ]}
        options={chartOptions}
      />
    </div>
  );
};

export default InterestChart;
