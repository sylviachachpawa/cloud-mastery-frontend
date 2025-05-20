"use client";

import React from "react";
import TitleBar from "./components/common/TitleBar";
// import TotalSalesAreaChart from "./components/TotalSalesAreaChart";
// import TotalRevenueAreaChart from "./components/TotalRevenueAreaChart";
// import TotalProfitAreaChart from "./components/TotalProfitAreaChart";
// import RecentSales from "./components/RecentSales";
// import Button from "./components/ui/Button";
// import { FiExternalLink } from "react-icons/fi";
// import RecentProducts from "./components/RecentProducts";
// import RecentCustomers from "./components/RecentCustomers";

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

        
      </div>
    </>
  );
}
