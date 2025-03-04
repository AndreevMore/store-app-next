import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Order, Product } from "@/types/types";
import { useRouter } from "next/navigation";
import { deleteCart, addNewCart, updateCart } from "@/services/api.service";

const generateUniqueNumber = () => Date.now();

export const useDeleteOrderMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (id: string) => deleteCart(id),
    onSuccess: (_, id) => {
      queryClient.setQueryData<Order[]>(["orders"], (oldOrders) =>
        oldOrders ? oldOrders.filter((order) => order.id !== Number(id)) : [],
      );
      router.back();
    },
    onError: (err) => {
      console.error("Failed to delete order:", err);
      alert("Error deleting order.");
    },
  });
};

export const useAddOrderMutation = (
  setIsModalOpen: (isOpen: boolean) => void,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (orderData: { status: string; products: Product[] }) =>
      addNewCart(orderData),
    onSuccess: (newOrderDetails, status) => {
      const newOrder: Order = {
        id: generateUniqueNumber(),
        date: new Date().toISOString(),
        status: status.status,
        products: newOrderDetails.products,
      };
      queryClient.setQueryData<Order[]>(["orders"], (oldOrders = []) => [
        ...oldOrders,
        newOrder,
      ]);
      setIsModalOpen(false);
    },
  });
};

export const useEditOrderMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<Order, Error, { id: number; cartData: Partial<Order> }>({
    mutationFn: async ({ id, cartData }) =>
      updateCart(id, { ...cartData, id } as Order),
    onSuccess: (updatedOrder, cartData) => {
      const updatedOrderWithStatus = {
        ...updatedOrder,
        status: cartData.cartData?.status || updatedOrder.status,
      };

      queryClient.setQueryData<Order[]>(["orders"], (oldOrders = []) =>
        oldOrders.map((order) =>
          order.id === updatedOrder.id ? updatedOrderWithStatus : order,
        ),
      );
    },
  });
};
