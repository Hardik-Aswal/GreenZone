import Image from "next/image";
import type { Product } from "../types";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  console.log(product);
  return (
    <div className="bg-white rounded-lg overflow-hidden group cursor-pointer">
      <div className="aspect-square relative overflow-hidden">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-3">
        <h3 className="text-sm font-medium text-gray-900 line-clamp-2">{product.name}</h3>
        {product.price && (
          <div className="mt-2 flex items-center space-x-2">
            <span className="text-lg font-bold text-gray-900">₹{product.price.toLocaleString()}</span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">₹{product.originalPrice.toLocaleString()}</span>
            )}
            {product.discount && <span className="text-sm text-green-600 font-medium">{product.discount}</span>}
          </div>
        )}
      </div>
    </div>
  );
}
