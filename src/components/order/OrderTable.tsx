import { OrderActions } from "./OrderActions";
import { OrderTableProps } from "./types";

export function OrderTable({
  orders,
  filter,
  debouncedSearch,
  deleteMutation,
}: OrderTableProps) {
  const filteredOrders =
    filter === "all"
      ? orders
      : orders.filter((order) => order.status === filter);

  const searchedOrders = filteredOrders.filter((order) =>
    `Order ${order.id}`.toLowerCase().includes(debouncedSearch.toLowerCase()),
  );

  return (
    <table className="w-full border-collapse border border-gray-300">
      <thead>
        <tr>
          <th className="border p-2">ID</th>
          <th className="border p-2">Status</th>
          <th className="border p-2">Date</th>
          <th className="border p-2">Products</th>
          <th className="border p-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {searchedOrders.map((order) => (
          <tr key={order.id} className="border">
            <td className="border p-2">Order {order.id}</td>
            <td className="border p-2">{order.status}</td>
            <td className="border p-2">
              {order.date ? new Date(order.date).toLocaleDateString() : "N/A"}
            </td>
            <td className="border p-2">
              {order.products.map(({ productId, quantity }) => (
                <div key={productId}>
                  Item {productId}: Q {quantity}
                </div>
              ))}
            </td>
            <OrderActions order={order} deleteMutation={deleteMutation} />
          </tr>
        ))}
      </tbody>
    </table>
  );
}
