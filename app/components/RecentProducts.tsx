import { useEffect } from "react";
import { useGlobalStore } from "../stores/useGlobal";
import Image from "next/image";
import { demoProducts } from "../lib/products";
import { RecentItemsSkeleton } from "./common/RecentItemsSkeleton";

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

  return loading ? (
    <RecentItemsSkeleton />
  ) : (
    <div className="mt-0">
     
      <ul className="mt-3 space-y-2">
        {products.slice(0, 6).map((product) => (
          <li
            key={product.id}
            className="flex items-center justify-between rounded-md hover:bg-gray-100 bg-gray-50 px-4 py-2"
          >
            <div className="flex items-center space-x-3">
              <Image
                src={product.imageSrc}
                alt={product.imageAlt}
                width={32}
                height={32}
                className="rounded object-cover"
              />
              <span className="text-sm text-gray-800">{product.name}</span>
            </div>
            <span className="text-sm font-semibold text-gray-900">
              {product.total_order} orders
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
