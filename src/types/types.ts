export type Order = {
  id: number;
  products: Product[];
  status: string;
  date?: string;
};
export type NewOrder = {
  products: Product[];
  status?: string;
  date?: string;
};
export type UpdateOrderStatusProps = {
  id: string;
  status: string;
};

export type Product = {
  productId: number;
  quantity: number;
};
