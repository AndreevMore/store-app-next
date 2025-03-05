"use client";

import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchOrderDetails, fetchOrders } from "@/services/api.service";
import ErrorMessage from "@/app/components/ErrorMessage";
import Skeleton from "@/app/components/Skeleton";
import { Pencil, ChevronLeft, Trash2 } from "lucide-react";
import { useModalContext } from "@/providers/ModalContext";
import Head from "next/head";
import { useDeleteOrderMutation } from "@/mutations/mutations";
import { OrderModal } from "@/app/components/order/OrderModal";
import { useProducts } from "@/providers/ProductsProvider";
import ProductCard from "@/app/components/ProductCard";
import { Button } from "@/components/ui/button";

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

      <div className="m-4 flex justify-center">
        <div className="w-full rounded-lg border border-gray-700 p-6 shadow-lg dark:border-gray-300">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Order Details: {id}</h1>
            <div className="flex justify-between gap-2">
              <Button
                onClick={() => {
                  setIsModalOpen(true);
                  setOrderToEdit(orderData ?? null);
                }}
              >
                <Pencil size={20} className="text-green-500" /> Edit
              </Button>
              <Button
                onClick={() => deleteMutation.mutate(id.toString())}
                disabled={deleteMutation.isPending}
              >
                <Trash2 size={20} className="text-red-500" />
                {deleteMutation.isPending ? "Deleting..." : "Delete"}
              </Button>
              <Button onClick={() => router.back()}>
                <ChevronLeft size={20} className="text-green-500" /> Go Back
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="m-4 flex justify-center">
        <div className="w-full rounded-lg border border-gray-700 p-6 shadow-lg dark:border-gray-300">
          <div className="flex items-center justify-between">
            <ul>
              {orderData &&
                orderData.products.map((product) => {
                  const productDetails = products[product.productId];

                  return (
                    <li
                      key={product.productId}
                      className="border-b border-gray-600 py-2 dark:border-gray-200"
                    >
                      <div>
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
          </div>
        </div>
      </div>

      <OrderModal isModalOpen={isModalOpen} orderToEdit={orderToEdit} />
    </>
  );
}
