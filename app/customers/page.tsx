"use client";
import { useEffect, useState } from "react";
import { useGlobalCustomer } from "../stores/useGlobal";
import { demoCustomers } from "../lib/customers";
import Table, { Column } from "../components/common/Table";
import { Loader } from "rsuite";
import { useRouter } from "next/navigation";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import { CustomersType } from "../types/CustomersType";

export default function ProductList() {
  const { customers, loading, setCustomers, setLoading } = useGlobalCustomer();
  const [rowLoading, setRowLoading] = useState<string | undefined>(undefined);
  const router = useRouter();

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      await new Promise((res) => setTimeout(res, 1500));
      setCustomers(demoCustomers);
      setLoading(false);
    };
    load();
  }, [setCustomers, setLoading]);

  if (loading) {
    return <div className="text-center py-8">Loading customers...</div>;
  }
  const limit = demoCustomers.length;

   const totalRows: number = customers.length || 0;

  const columns: Column<CustomersType>[] = [
    {
      key: "first_name",
      label: "Firstname",
    },
    {
      key: "last_name",
      label: "Lastname",
    },
    {
      key: "email",
      label: "Email",
    },
    {
      key: "registration_date",
      label: "Date joined",
    },
    {
      key: "city",
      label: "City",
    },
    {
      key: "country",
      label: "Country",
    },
  ];
  const handleCustomerClick = (customer: CustomersType) => {
    setRowLoading(customer.id.toString());
    setTimeout(() => {
      router.push(`/customers/${customer.id}`);
    }, 300);
  };
  return (
    <>
      <Table
        data={customers}
        columns={columns}
        onRowClick={handleCustomerClick}
        pagination={{
          itemsPerPage: limit,
        }}
        showPagination={true}
        tableTitle="Customers"
        currentPage={1}
        totalItems={totalRows}
        loading={loading}
        buttonLink="/customers/add"
        buttonLabel="New Customer"
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
