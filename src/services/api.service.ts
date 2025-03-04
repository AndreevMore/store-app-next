import { Order } from "@/types/types";

const API_URL = "https://fakestoreapi.com/carts";
const TIMEOUT = 10000; // 10 seconds

const fetchWithTimeout = async (url: string, options?: RequestInit) => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT);

  try {
    const res = await fetch(url, { ...options, signal: controller.signal });
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    return res.json();
  } finally {
    clearTimeout(timeout);
  }
};

export const fetchOrders = async (): Promise<Order[]> =>
  fetchWithTimeout(API_URL + "?limit=25");

export const fetchOrderDetails = async (id: string): Promise<Order> =>
  fetchWithTimeout(`${API_URL}/${id}`);

export const addNewCart = async (cartData: Partial<Order>): Promise<Order> =>
  fetchWithTimeout(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(cartData),
  });

export const updateCart = async (id: number, cartData: Order): Promise<Order> =>
  fetchWithTimeout(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(cartData),
  });

export const deleteCart = async (id: string): Promise<{ message: string }> =>
  fetchWithTimeout(`${API_URL}/${id}`, { method: "DELETE" });
