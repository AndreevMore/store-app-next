"use client";

import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchOrderDetails, fetchOrders } from "@/services/api.service";
import ErrorMessage from "@/app/components/ErrorMessage";
import Skeleton from "@/app/components/Skeleton";
import { Pencil, Trash2 } from "lucide-react";
import { useModalContext } from "@/providers/ModalContext";
import { OrderModal } from "@/app/components/order/OrderModal";
import Head from "next/head";
import { useDeleteOrderMutation } from "@/mutations/mutations";

export default function OrderDetail() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { isModalOpen, setIsModalOpen, setOrderToEdit, orderToEdit } =
    useModalContext();

  const { data: orders = [] } = useQuery({
    queryKey: ["orders"],
    queryFn: fetchOrders,
    staleTime: 60000,
  });
  const deleteMutation = useDeleteOrderMutation();
  const cachedOrder = orders.find((order) => order.id === Number(id));

  const cachedOrderData = cachedOrder
    ? {
        id: cachedOrder.id,
        products: cachedOrder.products,
        status: cachedOrder.status,
      }
    : null;
  const {
    data: order,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["order", id],
    queryFn: () => fetchOrderDetails(id),
    staleTime: 60000,
    enabled: !cachedOrderData,
  });

  const orderData = cachedOrderData || order;

  if (isLoading && !orderData) {
    return <Skeleton />;
  }

  if (error) return <ErrorMessage message={error.message} />;

  return (
    <>
      <Head>
        <title>Order #{id} - Order Details</title>
        <meta
          name="description"
          content={`View details for order #${id}. Manage your orders efficiently.`}
        />
        <meta
          name="keywords"
          content={`order ${id}, ecommerce order, order tracking, order details`}
        />
        <meta name="robots" content="index, follow" />

        <meta property="og:title" content={`Order #${id} - Order Details`} />
        <meta
          property="og:description"
          content={`Details for order #${id}. Manage and track your order efficiently.`}
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={`https://yourdomain.com/orders/${id}`}
        />
        <meta
          property="og:image"
          content="https://yourdomain.com/static/order-preview.jpg"
        />

        <link rel="canonical" href={`https://yourdomain.com/orders/${id}`} />
      </Head>

      <div className="p-6 flex justify-center">
        <div className="bg-[var(--foreground)] text-[var(--background)] shadow-lg rounded-lg p-6 w-full max-w-lg border border-gray-700 dark:border-gray-300">
          <h1 className="text-2xl font-bold mb-4">Order Details: {id}</h1>
          <ul className="mb-4">
            {orderData &&
              orderData.products.map((product) => (
                <li
                  key={product.productId}
                  className="border-b border-gray-600 dark:border-gray-200 py-2"
                >
                  <span className="font-medium">ID:</span> {product.productId}{" "}
                  <br />
                  <span className="font-medium">Quantity:</span>{" "}
                  {product.quantity}
                </li>
              ))}
          </ul>
          <div className="flex justify-between">
            <button
              className="flex cursor-pointer items-center gap-2 p-2 border rounded text-blue-500"
              onClick={() => {
                setIsModalOpen(true);
                setOrderToEdit(orderData ?? null);
              }}
            >
              <Pencil size={20} /> Edit
            </button>
            <button
              className="flex items-center cursor-pointer gap-2 p-2 border rounded text-white bg-red-500 hover:bg-red-600 dark:bg-red-400 dark:hover:bg-red-500 transition disabled:opacity-50"
              onClick={() => deleteMutation.mutate(id.toString())}
              disabled={deleteMutation.isPending}
            >
              <Trash2 size={20} />
              {deleteMutation.isPending ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-4">
        <button
          className="bg-gray-300 text-gray-900 px-4 cursor-pointer py-2 rounded hover:bg-gray-400 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600 transition"
          onClick={() => router.back()}
        >
          Back to Previous Page
        </button>
      </div>
      <OrderModal isModalOpen={isModalOpen} orderToEdit={orderToEdit} />
    </>
  );
}
