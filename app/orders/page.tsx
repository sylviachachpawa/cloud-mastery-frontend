"use client";
import { useEffect } from "react";
import { useGlobalSale } from "../stores/useGlobal";
import Table, { Column } from "../components/common/Table";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import { OrderType } from "../types/SalesType";
import { getOrders } from "../api";
import { formatRelativeDate, formatUnderscoreToSpace, renderStatusBadge } from "../util";

export default function Sales() {
  const { orders, loading, setOrders, setLoading } = useGlobalSale();

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const orders = await getOrders();
      setOrders(orders.data);
      setLoading(false);
    };
    load();
  }, [setOrders, setLoading]);
 

  const totalRows: number = orders.length || 0;

  const columns: Column<OrderType>[] = [
    {
      key: "id",
      label: "Order ID",
      // render: (row: OrderType) => row.id.slice(0, 8)
    },
    {
      key: "customerName",
      label: "Customer",
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
            <span>{firstItem.productName}</span>
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
      key: "orderAmount",
      label: "Total Price",
      render: (product) => `KES ${product.orderAmount}`,
    },
    {
      key: "status",
      label: "Status",
      render: (sale) => renderStatusBadge(sale.status),
    },
    {
      key: "createdAt",
      label: "Date",
      render: (row) => formatRelativeDate(row.createdAt),
    },
    {
      key: "paymentMethod",
      label: "Payment Method",
      render: (row) => formatUnderscoreToSpace(row.paymentMethod),
    },
  ];

  return (
    <>
      <Table
        data={orders}
        columns={columns}
        tableTitle="Orders"
        currentPage={1}
        totalItems={totalRows}
        loading={loading}
        buttonLink="/orders/add"
        buttonLabel="New Order"
        buttonIcon={<PlusCircleIcon className="w-5 h-5" />}
        showHeader={true}
      />
    </>
  );
}
