"use client";
import { useEffect } from "react";
import { useGlobalCustomer } from "../stores/useGlobal";
import Table, { Column } from "../components/common/Table";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import { CustomersType } from "../types/CustomersType";
import { getCustomers } from "../api";
import { formatRelativeDate } from "../util";

export default function ProductList() {
  const { customers, loading, setCustomers, setLoading } = useGlobalCustomer();

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const customers = await getCustomers();
      setCustomers(customers.data);
      setLoading(false);
    };
    load();
  }, [setCustomers, setLoading]);

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
      render: (row) => formatRelativeDate(row.createdAt),
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

  return (
    <>
      <Table
        data={customers}
        columns={columns}
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
    </>
  );
}
