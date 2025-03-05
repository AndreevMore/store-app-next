import React from "react";
import { ProductCard as ProductCardType } from "@/types/types";
import Image from "next/image";

interface ProductCardProps {
  product?: ProductCardType;
  productId?: string;
  quantity?: number;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  productId,
  quantity,
}) => {
  if (product) {
    return (
      <div className="product-card flex">
        <div className="relative mr-4 h-auto w-[200px] flex-shrink-0">
          <Image
            src={product.image}
            alt={product.title}
            className="rounded-md"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="flex-1">
          <h2 className="text-lg font-medium">
            ID: {product.id} - {product.title}
          </h2>
          <p>Quantity: {quantity}</p>
          <p>{product.description}</p>
          <p>Price: ${product.price}</p>
          <p>Category: {product.category}</p>
          <div>
            <p>
              Rating: {product.rating.rate} ({product.rating.count} reviews)
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <span className="font-medium">ID:</span> {productId}
      <br />
      <span className="font-medium">Quantity:</span> {quantity}
    </div>
  );
};

export default ProductCard;
