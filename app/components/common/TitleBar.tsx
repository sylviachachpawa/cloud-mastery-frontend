"use client";

import React from "react";
import Link from "next/link";
import { DateRangePicker } from "rsuite";
import "rsuite/DateRangePicker/styles/index.css";
import Button from "../ui/Button";

type Props = {
  title?: string;
  buttonLabel?: string;
  buttonLink?: string;
  buttonIcon?: React.ReactNode;
  showDateRange?: boolean;
};

export default function TitleBar({
  title,
  buttonLink = "#",
  showDateRange = false,
  buttonLabel = "",
  buttonIcon,
}: Props) {
  return (
    <div className="w-full">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        {/* Left: Title */}
        {title && (
          <div className="text-xl font-semibold text-gray-900">{title}</div>
        )}

        {/* Right: Date + Button */}
        <div className="flex flex-col lg:flex-row items-start md:items-center gap-4">
          {showDateRange && <DateRangePicker placeholder="Select date range" />}
          {buttonLink && (
            <Link href={buttonLink} passHref>
              <Button label={buttonLabel} icon={buttonIcon} />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
