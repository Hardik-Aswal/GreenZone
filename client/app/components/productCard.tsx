"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Star, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { ProductDetail } from "../types/product";

interface ProductCardProps {
  product: ProductDetail;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
      />
    ));
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("Added to cart:", product.title);
  };

  return (
    <Card
      className={`h-full transition-all duration-200 cursor-pointer ${
        isHovered ? "shadow-lg transform -translate-y-1" : "shadow-sm"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/product/${product.id}`} className="block h-full">
        <CardContent className="p-4 flex flex-col h-full relative">
          {product.isBestseller && (
            <div className="absolute -top-4 right-4 z-10">
              <Badge className="bg-yellow-500 hover:bg-yellow-600 text-white">BESTSELLER</Badge>
            </div>
          )}

          <div className="mb-3">
            <h3 className="text-sm font-medium line-clamp-2 h-10 leading-5">{product.title}</h3>
          </div>

          <div className="mb-2 flex items-center">
            <span className="text-lg font-bold">${product.price?.toFixed(2) ?? "0.00"}</span>
            {product.originalPrice != null && (
              <span className="ml-2 text-sm text-gray-500 line-through">
                ${product.originalPrice?.toFixed(2) ?? "0.00"}
              </span>
            )}
          </div>

          <div className="flex items-center mb-4">
            <div className="flex mr-1">{renderStars(product.rating ?? 0)}</div>
            <span className="text-xs text-gray-600">({product.reviewCount?.toLocaleString() ?? "0"})</span>
          </div>

          <div className="flex-grow flex items-center justify-center my-4">
            <div className="relative w-full aspect-square max-w-[200px]">
              <Image
                src={product.images?.[0] ?? "/placeholder.svg"}
                alt={product.title ?? ""}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          </div>

          <div className="mt-auto space-y-2">
            <Button onClick={handleAddToCart} className="w-full bg-yellow-400 hover:bg-yellow-500 text-black">
              <ShoppingCart className="h-4 w-4 mr-2" />
              Add to Cart
            </Button>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}
