"use client";
import { useEffect } from "react";
import { useGlobalStore } from "../stores/useGlobal";
import { ProductType } from "../types/ProductType";
import Table, { Column } from "../components/common/Table";
import { getProducts } from "../api";

export default function ProductList() {
  const { products, loading, setProducts, setLoading } = useGlobalStore();

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const products = await getProducts();
      setProducts(products.data);
      setLoading(false);
    };
    load();
  }, [setProducts, setLoading]);

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
      key: "unitCost",
      label: "Item Cost",
      render: (product) => `KES ${product.unitCost}`,
    },
    {
      key: "category",
      label: "Category",
    },
  ];
  return (
    <>
      <Table
        data={products}
        columns={columns}
        tableTitle="Products"
        currentPage={1}
        totalItems={totalRows}
        loading={loading}
        showHeader={true}
      />
    </>
  );
}
