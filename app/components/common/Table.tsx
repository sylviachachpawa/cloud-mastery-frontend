"use client";

import React, { useState, useMemo, useCallback } from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpDownIcon,
} from "@heroicons/react/24/solid";
import clsx from "clsx";
import TitleBar from "./TitleBar";
import TableSkeleton from "./TableSkeleton";

export interface Column<T> {
  key: keyof T;
  label: string;
  render?: (item: T) => React.ReactNode;
}

type TableProps<T> = {
  data: T[];
  columns: Column<T>[];
  onRowClick?: (row: T) => void;
  sortable?: boolean;
  pagination?: {
    itemsPerPage: number;
  };
  showPagination?: boolean;
  showHeader?: boolean;
  viewMoreLink?: string;
  tableTitle?: string;
  currentPage?: number;
  setCurrentPage?: (page: number) => void;
  totalItems?: number;
  loading?: boolean;
  rowLoadingId?: string;
  getRowClassName?: (row: unknown) => string;
  errorMessage?: string;
  buttonLink?: string;
  buttonLabel?: string;
  buttonIcon?: React.ReactNode;
};

export default function Table<T>({
  data,
  columns,
  onRowClick,
  sortable = true,
  pagination,
  showPagination = true,
  showHeader = false,
  tableTitle,
  totalItems,
  currentPage = 1,
  setCurrentPage,
  loading,
  errorMessage,
  getRowClassName,
  buttonLink,
  buttonLabel,
  buttonIcon,
}: TableProps<T>) {
  const [sortColumn, setSortColumn] = useState<keyof T | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const sortedData = useMemo(() => {
    if (!data || data.length === 0 || !sortColumn) return data ?? [];

    return [...data].sort((a, b) => {
      const aValue = a[sortColumn];
      const bValue = b[sortColumn];

      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortDirection === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      } else if (typeof aValue === "number" && typeof bValue === "number") {
        return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
      }

      return 0;
    });
  }, [data, sortColumn, sortDirection]);

  const paginatedData = sortedData;
  const totalPages =
    pagination && totalItems
      ? Math.ceil(totalItems / pagination.itemsPerPage)
      : 1;

  const handleSort = useCallback(
    (column: keyof T) => {
      setSortColumn((prev) => {
        if (prev === column) {
          setSortDirection((prevDir) => (prevDir === "asc" ? "desc" : "asc"));
          return prev;
        } else {
          setSortDirection("asc");
          return column;
        }
      });
    },
    [setSortColumn, setSortDirection]
  );

  return (
    <div className="space-y-4">
      {showHeader && (
        <div className="mt-4 flex">
          <TitleBar
            title={tableTitle}
            buttonLink={buttonLink}
            buttonLabel={buttonLabel}
            buttonIcon={buttonIcon}
          />
        </div>
      )}
      {showPagination && (
        <>
          <div className="flex justify-between items-center mt-2 p-2 text-lg">
            {totalPages > 1 && (
              <div className="flex gap-2">
                <button
                  onClick={() =>
                    setCurrentPage?.(Math.max((currentPage ?? 1) - 1, 1))
                  }
                  disabled={(currentPage ?? 1) === 1}
                  className="px-3 py-1 cursor-pointer bg-gray-200 rounded-md disabled:opacity-50 flex items-center"
                >
                  <ChevronLeftIcon
                    className="h-4 w-4 text-gray-700 mr-1"
                    aria-hidden="true"
                  />{" "}
                  Previous
                </button>

                <button
                  onClick={() =>
                    setCurrentPage?.(
                      Math.min((currentPage ?? 1) + 1, totalPages)
                    )
                  }
                  disabled={(currentPage ?? 1) === totalPages}
                  className="px-3 py-1 cursor-pointer bg-gray-200 rounded-md disabled:opacity-50 flex items-center"
                >
                  Next{" "}
                  <ChevronRightIcon
                    className="h-4 w-4 text-gray-700 ml-1"
                    aria-hidden="true"
                  />
                </button>
              </div>
            )}
          </div>
        </>
      )}

      {loading ? (
       <TableSkeleton rows={10} columns={columns.length} />
      ) : errorMessage ? (
        <div className="text-red-500 p-8 text-center card">{errorMessage}</div>
      ) : (
        <div className="overflow-x-auto w-full rounded-xl shadow">
          <table className="min-w-full divide-gray-200 card">
            {/* Table Head */}
            <thead className="bg-white border-b">
              <tr className="text-left text-gray-700">
                {columns.map((col) => (
                  <th
                    key={col.key as string}
                    className="px-6 py-3 text-left text-xs font-medium border-r border-gray-200 text-gray-500 tracking-wider cursor-pointer"
                    onClick={() => sortable && handleSort(col.key)}
                  >
                    <div className="flex items-center justify-between font-semibold text-black">
                      {col.label}
                      <ChevronUpDownIcon
                        className={clsx("h-4 w-4 inline-block", {
                          "transform rotate-180":
                            sortColumn === col.key && sortDirection === "desc",
                        })}
                      />
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="text-gray-500 text-sm cursor-pointer">
              {paginatedData.map((row, index) => (
                <tr
                  key={index}
                  onClick={() => onRowClick && onRowClick(row)}
                  className={clsx(
                    index % 2 === 0 ? "bg-gray-50" : "bg-white",
                    "hover:bg-gray-100 border-b border-gray-200",
                    getRowClassName && getRowClassName(row)
                  )}
                >
                  {columns.map((col) => (
                    <td
                      key={col.key as string}
                      className="px-6 py-4 border-r border-gray-200"
                    >
                      {col.render ? col.render(row) : String(row[col.key])}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      {!loading &&
        showPagination &&
        pagination &&
        totalItems &&
        totalItems > 0 &&
        totalPages > 1 && (
          <div className="flex justify-between items-center mt-4 p-2 text-lg">
            <span className="text-gray-700 ">
              <span className="text-gray-700">
                {/* Ensure we don't display 0 if totalItems is 0 */}
                Showing {(currentPage! - 1) * pagination.itemsPerPage + 1}–
                {Math.min(currentPage! * pagination.itemsPerPage, totalItems)}{" "}
                of {totalItems} items
              </span>{" "}
            </span>
            <div className="flex gap-2">
              <button
                onClick={() =>
                  setCurrentPage?.(Math.max((currentPage ?? 1) - 1, 1))
                }
                disabled={(currentPage ?? 1) === 1}
                className="px-3 py-1 cursor-pointer bg-gray-200 rounded-md disabled:opacity-50 flex items-center"
              >
                <ChevronLeftIcon
                  className="h-4 w-4 text-gray-700 mr-1"
                  aria-hidden="true"
                />{" "}
                Previous
              </button>

              <button
                onClick={() =>
                  setCurrentPage?.(Math.min((currentPage ?? 1) + 1, totalPages))
                }
                disabled={(currentPage ?? 1) === totalPages}
                className="px-3 py-1 cursor-pointer bg-gray-200 rounded-md disabled:opacity-50 flex items-center"
              >
                Next{" "}
                <ChevronRightIcon
                  className="h-4 w-4 text-gray-700 ml-1"
                  aria-hidden="true"
                />
              </button>
            </div>
          </div>
        )}
    </div>
  );
}
