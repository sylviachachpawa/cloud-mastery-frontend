"use client";
import { useEffect } from "react";
import { useGlobalStore } from "../stores/useGlobal";
 import { ProductType } from "../types/ProductType";
import Table, { Column } from "../components/common/Table";
// import { Loader } from "rsuite";
// import { useRouter } from "next/navigation";
import { getProducts } from "../api";
 
export default function ProductList() {
  const { products, loading, setProducts, setLoading } = useGlobalStore();
  // const [rowLoading, setRowLoading] = useState<string | undefined>(undefined);
  // const router = useRouter();

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const products = await getProducts();
      setProducts(products.data);
      setLoading(false);
    };
    load();
  }, [setProducts, setLoading]);

  if (loading) {
    return <div className="text-center py-8">Loading products...</div>;
  }
 
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
    },
    {
      key: "category",
      label: "Category",
    },
    
  ];
  // const handleProductClick = (product: ProductType) => {
  //   setRowLoading(product.id.toString());
  //   setTimeout(() => {
  //     router.push(`/customers/${product.id}`);
  //   }, 300);
  // };
  return (
    <>
      <Table
        data={products}
        columns={columns}
        // onRowClick={handleProductClick} 
        tableTitle="Products"
        currentPage={1}
        totalItems={totalRows}
        loading={loading} 
        showHeader={true}
      />
      {/* {rowLoading && (
        <div className="fixed top-0 left-0 w-full h-full bg-black-50 flex items-center justify-center z-50">
          <Loader />
        </div>
      )} */}
    </>
  );
}
