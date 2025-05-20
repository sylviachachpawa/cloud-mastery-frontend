"use client";

import React from "react";
import TitleBar from "./components/common/TitleBar"; 

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
