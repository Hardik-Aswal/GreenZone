"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Star, ShoppingCart, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { ProductDetail } from "../types/product";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { addItem } from "../store/cartSlice";

interface ProductCardProps {
  product: ProductDetail;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((s) => s.cart.items);
  const isInCart = cartItems.some((i) => i.id === product.id);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
      />
    ));
  };
  function formatIndianNumber(price: string): string {
    const [intPart, decPart] = price.split(".");
    let lastThree = intPart.slice(-3);
    let otherNumbers = intPart.slice(0, -3);

    if (otherNumbers !== "") {
      lastThree = "," + lastThree;
      otherNumbers = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",");
    }

    const formatted = otherNumbers + lastThree;
    return decPart != null ? `${formatted}.${decPart}` : formatted;
  }
  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isInCart || !product.inStock) return;
    setIsAdding(true);
    dispatch(addItem(product));
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
    setIsAdding(false);
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
            <span className="text-lg font-bold">₹{formatIndianNumber(product.price.toFixed(2)) ?? "0.00"}</span>
            {product.price != null && (
              <>
                <span className="ml-2 text-sm text-gray-500 line-through">
                  ₹{formatIndianNumber(product.price.toFixed(2)) ?? "0.00"}
                </span>
                {/* {product.discount && (
                  <Badge variant="destructive" className="ml-2 text-xs">
                    {product.discount}
                  </Badge>
                )} */}
              </>
            )}
          </div>
          <p className="text-sm text-green-700 mb-2">Carbon impact: {product.carbonImpact.toFixed(1)} kg CO₂e</p>

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
            <Button
              onClick={handleAddToCart}
              disabled={isAdding || isInCart || !product.inStock}
              className={`w-full transition-all duration-200 ${
                justAdded
                  ? "bg-green-500 hover:bg-green-600 text-white"
                  : isInCart
                  ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                  : "bg-yellow-400 hover:bg-yellow-500 text-black"
              }`}
            >
              {isAdding ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-black mr-2"></div>
                  Adding...
                </>
              ) : justAdded ? (
                <>
                  <Check className="h-4 w-4 mr-2" />
                  Added to Cart
                </>
              ) : isInCart ? (
                "In Cart"
              ) : !product.inStock ? (
                "Out of Stock"
              ) : (
                <>
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to Cart
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}
