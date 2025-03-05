import { Pencil } from "lucide-react";
import { OrderActionsProps } from "./types";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function OrderActions({ order }: OrderActionsProps) {
  return (
    <td className="p-2 align-middle">
      <Link href={`/orders/${order.id}`} className="flex justify-center">
        <Button>
          <Pencil size={20} /> Edit
        </Button>
      </Link>
    </td>
  );
}
