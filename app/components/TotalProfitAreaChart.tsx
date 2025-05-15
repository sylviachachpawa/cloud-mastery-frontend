"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { ApexOptions } from "apexcharts";
import { AreaChartSkeleton } from "./common/AreaChartSkeleton";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const generateProfiteData = () => {
  const data = [];
  const today = new Date();
  for (let i = 90; i >= 0; i -= 10) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    const label = date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
    data.push({
      x: label,
      y: Math.floor(Math.random() * (100000 - 5000 + 1)) + 5000,
    });
  }
  return data;
};

export default function TotalProfitAreaChart() {
  const [loading, setLoading] = useState(true);
  const [series, setSeries] = useState<
    { name: string; data: { x: string; y: number }[] }[]
  >([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const generatedData = generateProfiteData();
      const sum = generatedData.reduce((acc, point) => acc + point.y, 0);
      setSeries([
        {
          name: "Profit",
          data: generateProfiteData(),
        },
      ]);
      setTotal(sum);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  const options: ApexOptions = {
    chart: {
      type: "area",
      height: 260,
      toolbar: { show: false },
      zoom: { enabled: true },
    },
    dataLabels: { enabled: false },
    stroke: { curve: "smooth", width: 1.5 },
    xaxis: {
      type: "category",
      labels: {
        rotate: -45,
        style: { fontSize: "12px" },
      },
    },
    yaxis: {
      labels: {
        formatter: (val) => `$${val.toLocaleString()}`,
      },
    },
    colors: ["#B4DCC2"],
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.9,
        stops: [100, 100, 100],
      },
    },
  };

  return loading ? (
    <AreaChartSkeleton />
  ) : (
    <div>
      <p className="text-sm text-gray-900 mb-2">
         <span className="font-bold">${total.toLocaleString()}</span>
      </p>
      <ReactApexChart
        options={options}
        series={series}
        type="area"
        height={260}
      />
    </div>
  );
}
