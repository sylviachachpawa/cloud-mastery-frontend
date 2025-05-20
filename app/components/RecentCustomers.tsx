import { useEffect } from "react";
import { RecentItemsSkeleton } from "./common/RecentItemsSkeleton";
import { useGlobalCustomer } from "../stores/useGlobal";
import { demoCustomers } from "../lib/customers";
import { FaUserShield } from "react-icons/fa6";

export default function ProductList() {
  const { customers, loading, setProducts, setLoading } = useGlobalCustomer();

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      await new Promise((res) => setTimeout(res, 1500));
      setProducts(demoCustomers);
      setLoading(false);
    };
    load();
  }, [setProducts, setLoading]);

  return loading ? (
    <RecentItemsSkeleton />
  ) : (
    <div className="mt-0">
     
      <ul className="mt-3 space-y-2">
        {customers.slice(0, 7).map((customer) => (
          <li
            key={customer.id}
            className="flex items-center justify-between rounded-md hover:bg-gray-100 bg-gray-50 px-4 py-2"
          >
            <div className="flex items-center space-x-3">
              <FaUserShield className="w-6 h-6 text-gray-600" />
              <span className="text-sm text-gray-800">{customer.name}</span>
            </div>
            <span className="text-sm font-semibold text-gray-900">
              {customer.country}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
