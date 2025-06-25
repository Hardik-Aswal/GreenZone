"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Star, ShoppingCart, Check, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { ProductDetail } from "../types/product";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { addItem } from "../store/cartSlice";
import { formatIndianNumber } from "@/lib/utils";

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

  const calculateAverageRating = () => {
    if (!product.reviews || product.reviews.length === 0) return 0;
    const totalRating = product.reviews.reduce((sum, review) => sum + review.rating, 0);
    return totalRating / product.reviews.length;
  };

  const averageRating = calculateAverageRating();
  const reviewCount = product.reviews?.length || 0;

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
      />
    ));
  };

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

  const originalPrice = product.originalPrice * 1.0;
  const discountAmount = (product.discount * originalPrice) / 100;
  const finalPrice = originalPrice - discountAmount;

  return (
    <Card
      className={`h-full transition-all duration-200 cursor-pointer ${
        isHovered ? "shadow-lg transform -translate-y-1" : "shadow-sm"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/product/${product.id}`} className="block h-full">
        <CardContent className="p-4 pt-0 flex flex-col h-full relative">
          {/* {product.isBestSeller && (
            <div className="absolute -top-4 right-2 z-10">
              <Badge className="bg-yellow-500 hover:bg-yellow-600 text-white">BESTSELLER</Badge>
            </div>
          )} */}

          {!product.inStock && (
            <div className="absolute top-2 left-2 z-10">
              <Badge variant="destructive">Out of Stock</Badge>
            </div>
          )}

          <div className="mb-3">
            <h3 className="text-base font-medium line-clamp-2 h-10 leading-5 mb-3">{product.title}</h3>

            {product.ecoTags && product.ecoTags.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-2">
                {product.ecoTags.slice(0, 2).map((tag, index) => (
                  <Badge key={index} variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                    <Leaf className="h-3 w-3 mr-1" />
                    {tag}
                  </Badge>
                ))}
                {product.ecoTags.length > 2 && (
                  <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                    +{product.ecoTags.length - 2}
                  </Badge>
                )}
              </div>
            )}
          </div>

          <div className="mb-2 flex items-center flex-wrap">
            <span className="text-lg font-bold">₹{formatIndianNumber(finalPrice.toFixed(2))}</span>
            {discountAmount > 0 && (
              <>
                <span className="ml-2 text-sm text-gray-500 line-through">
                  ₹{formatIndianNumber(originalPrice.toFixed(2))}
                </span>
                <Badge variant="destructive" className="ml-2 text-xs">
                  {product.discount}% off
                </Badge>
              </>
            )}
          </div>

          <p className="text-sm text-green-700 mb-2">Carbon impact: {product.carbonImpact} kg CO₂e</p>

          <div className="flex items-center mb-4">
            <div className="flex mr-1">{renderStars(averageRating)}</div>
            <span className="text-xs text-gray-600">({reviewCount.toLocaleString()})</span>
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

            {/* {product.supportsEcoPackaging && (
              <Button variant="outline" className="w-full border-green-500 text-green-600 hover:bg-green-50">
                <Leaf className="h-4 w-4 mr-2" />
                Eco Packaging Available
              </Button>
            )} */}
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}
