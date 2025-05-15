"use client";

import React from "react";
import { FiDownload } from "react-icons/fi";
import Link from "next/link";
import { DateRangePicker } from "rsuite";
import "rsuite/DateRangePicker/styles/index.css";

type Props = {
  title: string;
  buttonLabel?: string;
  buttonLink?: string;
  showDateRange?: boolean;
};

export default function TitleBar({
  title,
  buttonLabel = "Export",
  buttonLink = "#",
  showDateRange = false,
}: Props) {
  return (
    <div className="w-full mb-6">
      {/* Top row: Title */}
      <div className="text-xl font-semibold text-gray-900 mb-4">{title}</div>

      {/* Bottom row: Date + Button */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        {showDateRange && (
          <DateRangePicker
            placeholder="Select date range"
            style={{ width: 260 }}
            appearance="default"
            cleanable
            loading={false}
            showHeader={false}
          />
        )}

        {buttonLink && (
          <Link href={buttonLink} passHref>
            <button className="flex items-center gap-2 bg-sky-200 hover:bg-sky-300 text-sky-900 font-medium py-2 px-4 rounded-md transition">
              <FiDownload />
              {buttonLabel}
            </button>
          </Link>
        )}
      </div>
    </div>
  );
}
