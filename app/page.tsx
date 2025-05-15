"use client";

import React from "react";
import TitleBar from "./components/common/TitleBar";
import TotalSalesAreaChart from "./components/TotalSalesAreaChart";
import TotalRevenueAreaChart from "./components/TotalRevenueAreaChart";
import TotalProfitAreaChart from "./components/TotalProfitAreaChart";
import RecentSales from "./components/RecentSales";
import Button from "./components/ui/Button";
import { FiExternalLink } from "react-icons/fi";

export default function Home() {
  return (
    <>
      <div className="space-y-4">
        <TitleBar
          title="Dashboard"
          buttonLabel="Export Reports"
          buttonLink="/api/reports/export"
          showDateRange={true}
        />

        <div className="flex flex-col lg:flex-row gap-4">
          <div className="card p-4 w-full">
            <h2 className="mb-2 font-semibold text-gray-600">Total Sales</h2>
            <TotalSalesAreaChart />
          </div>

          <div className="card p-4 w-full">
            <h2 className="mb-2 font-semibold text-gray-700">Total Revenue</h2>
            <TotalRevenueAreaChart />
          </div>
        </div>
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="card p-4 w-full">
            <h2 className="mb-2 font-semibold text-gray-700">Total Profit</h2>
            <TotalProfitAreaChart />
          </div>

          <div className="card p-4 w-full">
            <div className="flex items-center justify-between ">
              <h2 className=" font-semibold text-gray-700">Recent Sales</h2>
              <Button label="See all" icon={<FiExternalLink />} />
            </div>
            <RecentSales />
          </div>
        </div>
      </div>
    </>
  );
}
