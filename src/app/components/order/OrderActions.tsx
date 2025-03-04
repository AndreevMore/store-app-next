import { Pencil } from "lucide-react";
import { OrderActionsProps } from "./types";
import Link from "next/link";

export function OrderActions({ order }: OrderActionsProps) {
  return (
    <td className="p-2 align-middle">
      <Link
        href={`/orders/${order.id}`}
        className="flex justify-center text-green-500"
      >
        <button className="flex cursor-pointer items-center gap-2 rounded border p-2">
          <Pencil size={20} /> Edit
        </button>
      </Link>
    </td>
  );
}
