"use client";
import { createContext, useContext, ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "@/services/api.service";
import { ProductCard } from "@/types/types";

interface ProductsContextType {
  products: { [key: number]: ProductCard };
  error: unknown;
  isLoading: boolean;
}

const ProductsContext = createContext<ProductsContextType | null>(null);

interface ProductsProviderProps {
  children: ReactNode;
}

export const ProductsProvider = ({ children }: ProductsProviderProps) => {
  const {
    data: products = [],
    error,
    isLoading,
  } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
    staleTime: 60000,
  });

  const productsObj = products.reduce(
    (acc, product) => {
      acc[product.id] = product;
      return acc;
    },
    {} as { [key: number]: ProductCard },
  );

  return (
    <ProductsContext.Provider
      value={{ products: productsObj, error, isLoading }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error("useProducts must be used within a ProductsProvider");
  }
  return context;
};
