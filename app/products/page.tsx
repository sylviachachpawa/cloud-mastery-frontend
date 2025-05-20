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

  //  const products: ProductType[] = demoProducts || [];
  const totalRows: number = products.length || 0;

  const columns: Column<ProductType>[] = [
    {
      key: "name",
      label: "Product",
    },
    {
      key: "inventory",
      label: "Inventory",
    },
    {
      key: "item_cost",
      label: "Item Cost",
    },
    {
      key: "price",
      label: "Price",
    },
    {
      key: "status",
      label: "Status",
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
