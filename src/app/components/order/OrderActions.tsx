import { Pencil } from "lucide-react";
import { OrderActionsProps } from "./types";
import Link from "next/link";

export function OrderActions({ order }: OrderActionsProps) {
  return (
    <td className="align-middle p-2">
      <Link href={`/orders/${order.id}`} className="text-green-500 flex justify-center">
        <button className="flex cursor-pointer items-center gap-2 p-2 border rounded">
          <Pencil size={20} /> Edit
        </button>
      </Link>
    </td>
  );
}
