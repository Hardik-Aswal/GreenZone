"use client";

import type React from "react";

import { useState } from "react";
import Image from "next/image";
import { Star, Heart, Share2, ShoppingCart, Truck, Shield, Award, Users, Check, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { addToGroup, removeFromGroup } from "../store/groupOrderSlice";
import type { ProductDetail } from "../types/product";
import GroupOrderProgress from "./groupOrderProgress";
import ProductReviews from "./productReview";
import { addItem } from "../store/cartSlice";
import { formatIndianNumber } from "@/lib/utils";

interface ProductPageProps {
  product: ProductDetail;
}

export default function ProductPage({ product }: ProductPageProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const dispatch = useAppDispatch();
  const { groupedOrders, isGroupComplete } = useAppSelector((state) => state.groupOrder);
  const cartItems = useAppSelector((s) => s.cart.items);
  const isInCart = cartItems.some((i) => i.id === product.id);
  const isInGroup = groupedOrders.includes(product.id);

  const calculateAverageRating = () => {
    if (!product.reviews || product.reviews.length === 0) return 0;
    const totalRating = product.reviews.reduce((sum, review) => sum + review.rating, 0);
    return totalRating / product.reviews.length;
  };

  const averageRating = calculateAverageRating();
  const reviewCount = product.reviews?.length || 0;

  const originalPrice = product.originalPrice * 1.0;
  const discountAmount = (product.discount * originalPrice) / 100;
  const finalPrice = originalPrice - discountAmount;

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

  const handleGroupOrder = () => {
    if (isInGroup) {
      dispatch(removeFromGroup(product.id));
    } else {
      dispatch(addToGroup(product.id));
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
      />
    ));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5">
          <div className="space-y-4">
            <div className="aspect-square bg-white rounded-lg border overflow-hidden">
              <Image
                src={product.images[selectedImage] || "/placeholder.svg"}
                alt={product.title}
                width={500}
                height={500}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex space-x-2 overflow-x-auto">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-shrink-0 w-16 h-16 border-2 rounded-lg overflow-hidden ${
                    selectedImage === index ? "border-orange-500" : "border-gray-200"
                  }`}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`Product ${index + 1}`}
                    width={64}
                    height={64}
                    className="w-full h-full object-contain"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-4">
          <div className="space-y-4">
            <div>
              {product.isBestSeller && (
                <Badge variant="secondary" className="mb-2 bg-yellow-500 text-white">
                  BESTSELLER
                </Badge>
              )}
              <Badge variant="outline" className="mb-2 ml-2">
                {product.brand}
              </Badge>
              <h1 className="text-2xl font-bold text-gray-900 mb-3">{product.title}</h1>

              {product.ecoTags && product.ecoTags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {product.ecoTags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      <Leaf className="h-3 w-3 mr-1" />
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                {renderStars(averageRating)}
                <span className="ml-2 text-sm font-medium">{averageRating.toFixed(1)}</span>
              </div>
              <span className="text-sm text-blue-600 hover:underline cursor-pointer">
                {reviewCount.toLocaleString()} ratings
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex items-baseline space-x-2">
                <span className="text-3xl font-bold text-red-600">₹{formatIndianNumber(finalPrice.toFixed(2))}</span>
                {discountAmount > 0 && (
                  <>
                    <span className="text-lg text-gray-500 line-through">
                      ₹{formatIndianNumber(originalPrice.toFixed(2))}
                    </span>
                    <Badge variant="destructive">{Math.round((discountAmount / originalPrice) * 100)}% off</Badge>
                  </>
                )}
              </div>
              <p className="text-sm text-gray-600">Inclusive of all taxes</p>
              <p className="text-sm text-green-700">Carbon impact: {product.carbonImpact} kg CO₂e</p>
            </div>

            <div className="space-y-3">
              {product.deliveryType && product.deliveryType.includes("standard") && (
                <div className="flex items-center space-x-2 text-sm">
                  <Truck className="h-4 w-4 text-green-600" />
                  <span>FREE delivery by 8 July</span>
                </div>
              )}
              {product.deliveryType && product.deliveryType.includes("express") && (
                <div className="flex items-center space-x-2 text-sm">
                  <Truck className="h-4 w-4 text-blue-600" />
                  <span className="text-blue-600">Same day delivery available</span>
                </div>
              )}
              <div className="flex items-center space-x-2 text-sm">
                <Shield className="h-4 w-4 text-green-600" />
                <span>1 Year Limited Warranty</span>
              </div>
            </div>

            <Separator />

            <div className="space-y-3">
              <h3 className="font-semibold">Key Features:</h3>
              <ul className="space-y-1">
                {product.features.slice(0, 4).map((feature, index) => (
                  <li key={index} className="text-sm flex items-start space-x-2">
                    <Award className="h-3 w-3 text-green-600 mt-1 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="lg:col-span-3">
          <Card className="sticky top-4">
            <CardContent className="p-6 space-y-3 py-0">
              <div className="text-2xl font-bold text-green-700">₹{formatIndianNumber(finalPrice.toFixed(2))}</div>
              <p className="text-sm text-green-700">Carbon impact: {product.carbonImpact} kg CO₂e</p>

              <div className="space-y-2">
                {product.deliveryType && product.deliveryType.includes("standard") && (
                  <div className="flex items-center space-x-2 text-sm">
                    <Truck className="h-4 w-4 text-green-600" />
                    <span className="text-green-600">FREE delivery by 8 July</span>
                  </div>
                )}
                <div className="text-sm">
                  <span className="font-medium">Sold by:</span> {product.brand}
                </div>
                <div className="text-sm">
                  <span className="font-medium">Stock:</span>{" "}
                  <span className={product.inStock > 0 ? "text-green-600" : "text-red-600"}>
                    {product.inStock > 0 ? `In Stock` : "Out of Stock"}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Quantity:</label>
                <select
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="w-full p-2 border rounded-md"
                  disabled={product.inStock === 0}
                >
                  {Array.from({ length: Math.min(5, product.inStock) }, (_, i) => i + 1).map((num) => (
                    <option key={num} value={num}>
                      {num}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <Button
                  onClick={handleAddToCart}
                  disabled={isAdding || isInCart || product.inStock === 0}
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
                  ) : product.inStock === 0 ? (
                    "Out of Stock"
                  ) : (
                    <>
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add to Cart
                    </>
                  )}
                </Button>

                <GroupOrderProgress />

                <Button
                  onClick={handleGroupOrder}
                  className={`w-full font-medium transition-all duration-200 ${
                    isInGroup
                      ? "bg-green-800 hover:bg-green-900 text-white"
                      : "bg-green-700 hover:bg-green-800 text-white"
                  } ${isGroupComplete ? "ring-2 ring-green-300 ring-offset-2" : ""}`}
                  disabled={product.inStock === 0}
                >
                  <Users className="h-4 w-4 mr-2" />
                  {isInGroup ? "Remove from Group" : "Group Buy"}
                  {isGroupComplete && !isInGroup && " (Ready!)"}
                </Button>

                <Button variant="outline" className="w-full" disabled={product.inStock === 0}>
                  Buy Now
                </Button>
              </div>

              <div className="flex space-x-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Heart className="h-4 w-4 mr-1" />
                  Wishlist
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Share2 className="h-4 w-4 mr-1" />
                  Share
                </Button>
              </div>

              <div className="text-xs text-gray-600 space-y-1">
                <div>✓ 7 days replacement policy</div>
                <div>✓ GST invoice available</div>
                <div>✓ Eco-friendly delivery</div>
                {product.supportsEcoPackaging && (
                  <div className="text-green-600 font-medium">✓ Eco packaging available</div>
                )}
                {isGroupComplete && <div className="text-green-600 font-medium">✓ Group order benefits unlocked!</div>}
              </div>

              {product.supportsEcoPackaging && (
                <Button variant="outline" className="w-full border-green-500 text-green-600 hover:bg-green-50">
                  <Leaf className="h-4 w-4 mr-2" />
                  Choose Eco Packaging
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Product Information Tabs */}
      <div className="mt-12">
        <Tabs defaultValue="description" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>

          <TabsContent value="description" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Product Description</h3>
                <p className="text-gray-700 mb-6">{product.description}</p>

                <h4 className="font-semibold mb-3">Key Features:</h4>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <Award className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                {product.ecoTags && product.ecoTags.length > 0 && (
                  <div className="mt-6">
                    <h4 className="font-semibold mb-3">Sustainability Features:</h4>
                    <div className="flex flex-wrap gap-2">
                      {product.ecoTags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          <Leaf className="h-3 w-3 mr-1" />
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="specifications" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Technical Specifications</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-2 border-b border-gray-100">
                      <span className="font-medium text-gray-600 capitalize">{key}:</span>
                      <span className="text-gray-900">{value}</span>
                    </div>
                  ))}
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="font-medium text-gray-600">Carbon Impact:</span>
                    <span className="text-gray-900">{product.carbonImpact} kg CO₂e</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="font-medium text-gray-600">Weight:</span>
                    <span className="text-gray-900">{product.weight} kg</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="font-medium text-gray-600">Category:</span>
                    <span className="text-gray-900">{product.category1}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="font-medium text-gray-600">Sector:</span>
                    <span className="text-gray-900">{product.sector}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews" className="mt-6">
            <ProductReviews rating={averageRating} reviewCount={reviewCount} reviews={product.reviews ?? []} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
