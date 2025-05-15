"use client";

import React from "react";
import { FiDownload } from "react-icons/fi";
import Link from "next/link";
import { DateRangePicker } from "rsuite";
import "rsuite/DateRangePicker/styles/index.css";
import Button from "../ui/Button";

type Props = {
  title: string;
  buttonLabel?: string;
  buttonLink?: string;
  showDateRange?: boolean;
};

export default function TitleBar({
  title,
  buttonLink = "#",
  showDateRange = false,
}: Props) {
  return (
    <div className="w-full mb-6">
      {/* Top row: Title */}
      <div className="text-xl font-semibold text-gray-900 mb-4">{title}</div>

      {/* Bottom row: Date + Button */}
      <div className="flex flex-col lg:flex-row  items-start md:items-center justify-between gap-4">
        {showDateRange && <DateRangePicker placeholder="Select date range" />}
        {buttonLink && (
          <Link href={buttonLink} passHref>
            <Button label="Export report" icon={<FiDownload />} />
          </Link>
        )}
      </div>
    </div>
  );
}
