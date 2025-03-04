"use client";
import Head from "next/head";
import { useState, useEffect } from "react";
import ErrorMessage from "../components/ErrorMessage";
import Loader from "../components/Loader";
import { PlusCircle } from "lucide-react";
import { FilterSection } from "../components/order/FilterSection";
import { FilterOption } from "../components/order/types";
import { OrderModal } from "../components/order/OrderModal";
import { OrderTable } from "../components/order/OrderTable";
import { useModalContext } from "@/providers/ModalContext";
import { useDeleteOrderMutation } from "@/mutations/mutations";
import { useQuery } from "@tanstack/react-query";
import { fetchOrders } from "@/services/api.service";

export default function Orders() {
  const [filter, setFilter] = useState<FilterOption>("all");
  const [search, setSearch] = useState<string>("");
  const [debouncedSearch, setDebouncedSearch] = useState<string>("");
  const { isModalOpen, setIsModalOpen, setOrderToEdit, orderToEdit } =
    useModalContext();
  const deleteMutation = useDeleteOrderMutation();

  const {
    data: orders = [],
    error,
    isLoading,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: fetchOrders,
    staleTime: 60000,
  });

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(search), 1000);
    return () => clearTimeout(handler);
  }, [search]);

  if (isLoading) return <Loader />;
  if (error) return <ErrorMessage message={error.message} />;

  return (
    <div className="p-6">
      {/* SEO Metadata */}
      <Head>
        <title>Orders - Manage Your Orders</title>
        <meta
          name="description"
          content="View and manage customer orders efficiently."
        />
        <meta
          name="keywords"
          content="orders, order management, ecommerce, dashboard"
        />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Orders - Manage Your Orders" />
        <meta
          property="og:description"
          content="View and manage customer orders efficiently."
        />
        <meta property="og:type" content="website" />
      </Head>

      <h1 className="text-2xl font-bold text-center  ">Orders</h1>
      <div className="flex justify-between items-center  mb-4 mt-4">
        <FilterSection
          filter={filter}
          setFilter={setFilter}
          search={search}
          setSearch={setSearch}
        />
        <button
          className="flex cursor-pointer items-center gap-2 p-2 border rounded bg-blue-500 text-white"
          onClick={() => {
            setIsModalOpen(true);
            setOrderToEdit(null);
          }}
        >
          <PlusCircle size={20} /> Add Order
        </button>
      </div>

      <OrderTable
        orders={orders}
        filter={filter}
        debouncedSearch={debouncedSearch}
        deleteMutation={deleteMutation}
      />

      <OrderModal isModalOpen={isModalOpen} orderToEdit={orderToEdit} />
    </div>
  );
}
