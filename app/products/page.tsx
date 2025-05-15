'use client';
import { useEffect } from "react";
import { useGlobalStore } from "../stores/useGlobalProduct";
import Image from "next/image";
import { demoProducts } from "../lib/products";
export default function ProductList() {
  const { products, loading, setProducts, setLoading } = useGlobalStore();

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

  return (
    <ul
      role="list"
      className="mt-6 divide-y divide-gray-200 border-t border-gray-200 text-sm font-medium text-gray-500"
    >
      {products.map((product) => (
        <li key={product.id} className="flex space-x-6 py-6">
          <Image
            width={100}
            height={100}
            alt={product.imageAlt}
            src={product.imageSrc}
            className="size-24 flex-none rounded-md bg-gray-100 object-cover"
          />
          <div className="flex-auto space-y-1">
            <h3 className="text-gray-900">
              <a href={product.href}>{product.name}</a>
            </h3>
            <p>{product.color}</p>
            <p>{product.size}</p>
          </div>
          <p className="flex-none font-medium text-gray-900">{product.price}</p>
        </li>
      ))}
    </ul>
  );
}
