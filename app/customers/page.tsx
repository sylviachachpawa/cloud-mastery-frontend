"use client";
import { useEffect, useState } from "react";
import { useGlobalCustomer } from "../stores/useGlobal";
 import Table, { Column } from "../components/common/Table";
import { Loader } from "rsuite";
import { useRouter } from "next/navigation";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import { CustomersType } from "../types/CustomersType";
import { getCustomers } from "../api";
import { formatRelativeDate } from "../util";

export default function ProductList() {
  const { customers, loading, setCustomers, setLoading } = useGlobalCustomer();
  const [rowLoading, setRowLoading] = useState<string | undefined>(undefined);
  const router = useRouter();

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const customers = await getCustomers();
      setCustomers(customers.data);
      setLoading(false);
    };
    load();
  }, [setCustomers, setLoading]);

  if (loading) {
    return <div className="text-center py-8">Loading customers...</div>;
  }
  const limit = customers.length;

  const totalRows: number = customers.length || 0;

  const columns: Column<CustomersType>[] = [
    {
      key: "firstName",
      label: "Firstname",
    },
    {
      key: "lastName",
      label: "Lastname",
    },
    {
      key: "email",
      label: "Email",
    },
    {
      key: "createdAt",
      label: "Date joined",
      render: (row) => formatRelativeDate(row.createdAt)
    },
    {
      key: "address",
      label: "Address",
    },
    {
      key: "city",
      label: "City",
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
