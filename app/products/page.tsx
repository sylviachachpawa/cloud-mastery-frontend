"use client";
import { useEffect, useState } from "react";
import { useGlobalStore } from "../stores/useGlobal";
import { demoProducts } from "../lib/products";
import { ProductType } from "../types/ProductType";
import Table, { Column } from "../components/common/Table";
import { Loader } from "rsuite";
import { useRouter } from "next/navigation";
import { PlusCircleIcon } from "@heroicons/react/24/solid";

export default function ProductList() {
  const { products, loading, setProducts, setLoading } = useGlobalStore();
  const [rowLoading, setRowLoading] = useState<string | undefined>(undefined);
  const router = useRouter();

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      await new Promise((res) => setTimeout(res, 1500));
      setProducts(demoProducts);
      setLoading(false);
    };
    load();
  }, [setProducts, setLoading]);

  if (loading) {
    return <div className="text-center py-8">Loading products...</div>;
  }
  const limit = demoProducts.length;

  const totalRows: number = products.length || 0;

  const columns: Column<ProductType>[] = [
    {
      key: "name",
      label: "Product",
    },
    {
      key: "quantity",
      label: "Inventory",
    },
    {
      key: "unit_price",
      label: "Item Cost",
    },
    {
      key: "category",
      label: "Category",
    },
    {
      key: "status",
      label: "Status",
      render: (product) => {
        // 'render' is a common prop for custom cell rendering
        let statusClass = "";
        let statusText = "";

        switch (product.status) {
          case "in_stock":
            statusClass = "bg-green-100 text-green-500"; 
            statusText = "In Stock";
            break;
          case "low_stock":
            statusClass = "bg-red-100 text-red-500"; 
            statusText = "Low Stock";
            break;
          case "out_of_stock":
            statusClass = "bg-yellow-100 text-yellow-500"; 
            statusText = "Out of Stock";
            break;
          default:
            statusClass = "bg-gray-100 text-gray-500"; 
            statusText = product.status ?? "Unknown Status";
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
  ];
  const handleProductClick = (product: ProductType) => {
    setRowLoading(product.id.toString());
    setTimeout(() => {
      router.push(`/customers/${product.id}`);
    }, 300);
  };
  return (
    <>
      <Table
        data={products}
        columns={columns}
        onRowClick={handleProductClick}
        pagination={{
          itemsPerPage: limit,
        }}
        showPagination={true}
        tableTitle="Products"
        currentPage={1}
        totalItems={totalRows}
        loading={loading}
        buttonLink="/products/add"
        buttonLabel="New Product"
        buttonIcon={<PlusCircleIcon className="w-5 h-5" />}
        showHeader={true}
      />
      {rowLoading && (
        <div className="fixed top-0 left-0 w-full h-full bg-black-50 flex items-center justify-center z-50">
          <Loader />
        </div>
      )}
    </>
  );
}
