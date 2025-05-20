"use client";
import { useEffect, useState } from "react";
import { useGlobalSale } from "../stores/useGlobal";
import { demoSales } from "../lib/sales";
import Table, { Column } from "../components/common/Table";
import { Loader } from "rsuite";
import { useRouter } from "next/navigation";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import { SalesType } from "../types/SalesType";

export default function Sales() {
  const { orders, loading, setOrders, setLoading } = useGlobalSale();
  const [rowLoading, setRowLoading] = useState<string | undefined>(undefined);
  const router = useRouter();

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      await new Promise((res) => setTimeout(res, 1500));
      setOrders(demoSales);
      setLoading(false);
    };
    load();
  }, [setOrders, setLoading]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-48">
        <Loader size="md" content="Loading sales..." />
      </div>
    );
  }

  const totalRows: number = orders.length || 0;

  const columns: Column<SalesType>[] = [
    {
      key: "id",
      label: "Sales ID",
    },
    {
      key: "customer",
      label: "Customer",
      render: (sale) =>
        `${sale.customer.first_name} ${sale.customer.last_name}`,
    },
    {
      key: "items",
      label: "Items",
      render: (sale) => {
        if (!sale.items || sale.items.length === 0) {
          return "No items";
        }

        const firstItem = sale.items[0];
        const remainingItemsCount = sale.items.length - 1;

        return (
          <div className="flex flex-col">
            <span>{firstItem.name}</span>
            {remainingItemsCount > 0 && (
              <span className="text-gray-500 text-sm">
                + {remainingItemsCount} more
              </span>
            )}
          </div>
        );
      },
    },
    {
      key: "total_amount",
      label: "Total Price",
    },
    {
      key: "status",
      label: "Status",
      render: (sale) => {
        let statusClass = "";
        let statusText = "";

        switch (sale.status) {
          case "completed":
            statusClass = "bg-green-100 text-green-500";
            statusText = "Completed";
            break;
          case "pending":
            statusClass = "bg-yellow-100 text-yellow-500";
            statusText = "Pending";
            break;
          case "shipped":
            statusClass = "bg-blue-100 text-blue-500";
            statusText = "Shipped";
            break;
          case "cancelled":
            statusClass = "bg-red-100 text-red-500";
            statusText = "Cancelled";
            break;
          default:
            statusClass = "bg-gray-100 text-gray-500";
            statusText = sale.status;
        }

        return (
          <span
            className={`px-2 py-1 rounded-full text-xs font-semibold ${statusClass}`}
          >
            {statusText}
          </span>
        );
      },
    },
    {
      key: "date",
      label: "Date",
    },
    {
      key: "payment_method",
      label: "Payment Method",
    },
  ];

  const handleRowClick = (sale: SalesType) => {
    setRowLoading(sale.id.toString());
    setTimeout(() => {
      router.push(`/sales/${sale.id}`);
    }, 300);
  };

  return (
    <>
      <Table
        data={orders}
        columns={columns}
        onRowClick={handleRowClick}
        pagination={{
          itemsPerPage: 10,
        }}
        showPagination={true}
        tableTitle="Sales"
        currentPage={1}
        totalItems={totalRows}
        loading={loading}
        buttonLink="/sales/add"
        buttonLabel="New Sale"
        buttonIcon={<PlusCircleIcon className="w-5 h-5" />}
        showHeader={true}
      />
      {rowLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Loader size="lg" content="Loading..." />
        </div>
      )}
    </>
  );
}
