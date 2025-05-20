"use client";

import React from "react";
 import { useRouter } from "next/navigation";
 import "rsuite/DateRangePicker/styles/index.css";
import { ArrowUturnLeftIcon } from "@heroicons/react/24/solid";
 
type Props = {
  title?: string; 
  showBack?: boolean; // optional flag to show the back button
};

export default function NavigationTitleBar({
  title, 
  showBack = true, 
}: Props) {
  const router = useRouter();

  return (
    <div className="">
      <div className="  flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
         <div className="  items-center gap-3">
          {showBack && (
            <button
              onClick={() => router.back()}
              className="cursor-pointer border border-sky-50 flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-900 p-1.5 font-medium rounded-md transition"
            >
              <ArrowUturnLeftIcon className="w-4 h-4" /> {title}
            </button>
          )} 
        </div> 
      </div>
    </div>
  );
}
