"use client";

import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchOrderDetails, fetchOrders } from "@/services/api.service";
import ErrorMessage from "@/app/components/ErrorMessage";
import Skeleton from "@/app/components/Skeleton";
import { Pencil, Trash2 } from "lucide-react";
import { useModalContext } from "@/providers/ModalContext";
import Head from "next/head";
import { useDeleteOrderMutation } from "@/mutations/mutations";
import { OrderModal } from "@/app/components/order/OrderModal";
import { useProducts } from "@/providers/ProductsProvider";
import ProductCard from "@/app/components/ProductCard";

export default function OrderDetail() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { products } = useProducts();

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
      <div className="mt-4 flex justify-center">
        <button
          className="cursor-pointer rounded bg-gray-300 px-4 py-2 text-gray-900 transition hover:bg-gray-400 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600"
          onClick={() => router.back()}
        >
          Back to Previous Page
        </button>
      </div>
      <div className="flex justify-center p-6">
        <div className="w-full max-w-lg rounded-lg border border-gray-700 bg-[var(--foreground)] p-6 text-[var(--background)] shadow-lg dark:border-gray-300">
          <h1 className="mb-4 text-2xl font-bold">Order Details: {id}</h1>
          <ul className="mb-4">
            {orderData &&
              orderData.products.map((product) => {
                const productDetails = products[product.productId]; // получаем продукт по productId из контекста

                return (
                  <li
                    key={product.productId}
                    className="border-b border-gray-600 py-2 dark:border-gray-200"
                  >
                    <div>
                      {/* Отображаем ProductCard, если продукт найден */}
                      <ProductCard
                        product={productDetails}
                        productId={product.productId.toString()}
                        quantity={product.quantity}
                      />
                    </div>
                  </li>
                );
              })}
          </ul>
          <div className="flex justify-between">
            <button
              className="flex cursor-pointer items-center gap-2 rounded border p-2 text-blue-500"
              onClick={() => {
                setIsModalOpen(true);
                setOrderToEdit(orderData ?? null);
              }}
            >
              <Pencil size={20} /> Edit
            </button>
            <button
              className="flex cursor-pointer items-center gap-2 rounded border bg-red-500 p-2 text-white transition hover:bg-red-600 disabled:opacity-50 dark:bg-red-400 dark:hover:bg-red-500"
              onClick={() => deleteMutation.mutate(id.toString())}
              disabled={deleteMutation.isPending}
            >
              <Trash2 size={20} />
              {deleteMutation.isPending ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>
      </div>

      <OrderModal isModalOpen={isModalOpen} orderToEdit={orderToEdit} />
    </>
  );
}
