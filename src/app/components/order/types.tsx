import { Order } from "@/types/types";
import { UseMutationResult } from "@tanstack/react-query";

export type FilterOption = "all" | "pending" | "paid" | "shipped";

export interface OrderActionsProps {
  order: Order;
}

export type DeleteMutationType = UseMutationResult<
  { message: string },
  Error,
  string,
  unknown
>;

export interface OrderActionsProps {
  order: Order;
  deleteMutation: DeleteMutationType;
}

export interface OrderTableProps {
  orders: Order[];
  filter: FilterOption;
  debouncedSearch: string;
  deleteMutation: DeleteMutationType;
}

export interface OrderModalProps {
  isModalOpen: boolean;
  orderToEdit: Order | null;
}

export interface OrderModalProps {
  isModalOpen: boolean;
}