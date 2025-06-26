"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Check, CheckCircle, Package, Truck, MapPin, Calendar, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { clearCart } from "../store/cartSlice";
import { formatIndianNumber } from "@/lib/utils";

export default function CheckoutPage() {
  const dispatch = useAppDispatch();
  const { items, totalItems, totalAmount } = useAppSelector((s) => s.cart);
  const [orderNumber, setOrderNumber] = useState("");
  const [estimatedDelivery, setEstimatedDelivery] = useState("");

  useEffect(() => {

    const orderNum = `AMZ-${Date.now().toString().slice(-8)}`;
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 3); 
    
    setOrderNumber(orderNum);
    setEstimatedDelivery(deliveryDate.toLocaleDateString('en-IN', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }));


    if (items.length > 0) {
      setTimeout(() => {
        dispatch(clearCart());
      }, 10000);
    }
  }, [items.length, dispatch]);


const subtotal = items.reduce((sum, item) => {
  const originalPrice = Number(item.originalPrice) || 0;
  const discount = Number(item.discount) || 0;
  const discountAmount = (discount * originalPrice) / 100;
  const finalPrice = originalPrice - discountAmount;
  return sum + (finalPrice * item.quantity);
}, 0);

const savings = items.reduce((sum, item) => {
  const originalPrice = Number(item.originalPrice) || 0;
  const discount = Number(item.discount) || 0;
  const discountAmount = (discount * originalPrice) / 100;
  return sum + (discountAmount * item.quantity);
}, 0);

  const deliveryFee = subtotal > 499 ? 0 : 40;
  const tax = subtotal * 0.18; // 18% GST
  const total = subtotal + deliveryFee + tax;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md text-center p-8">
          <CardContent>
            <Package className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h2 className="text-2xl font-bold mb-4">No items to checkout</h2>
            <p className="text-gray-600 mb-6">Your cart is empty. Add some items to proceed with checkout.</p>
            <Link href="/">
              <Button className="bg-yellow-400 text-black hover:bg-yellow-500 w-full">
                Start Shopping
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-6 h-6 text-green-600" />
            <h1 className="text-2xl font-bold">Order Confirmed</h1>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Success Message */}
        <Card className="mb-8 bg-green-50 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                <Check className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-green-800 mb-2">
                  Thank you for your order!
                </h2>
                <p className="text-green-700 mb-4">
                  Your order has been confirmed and will be shipped soon.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <Package className="w-4 h-4 text-green-600" />
                    <span>Order #{orderNumber}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-green-600" />
                    <span>Estimated delivery: {estimatedDelivery}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-green-600" />
                    <span>Delivered to default address</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Order Items */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Package className="w-5 h-5" />
                  <span>Order Items ({totalItems} items)</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
              {items.map((item, index) => {

  const originalPrice = Number(item.originalPrice) || 0;
  const discount = Number(item.discount) || 0;
  const discountAmount = (discount * originalPrice) / 100;
  const finalPrice = originalPrice - discountAmount;
  const totalOriginal = originalPrice * item.quantity;
  const totalFinal = finalPrice * item.quantity;

  return (
    <div key={item.id}>
      <div className="flex items-start space-x-4">
        <div className="relative">
          <Image
            src={item.images[0] ?? "/placeholder.svg"}
            alt={item.title}
            width={80}
            height={80}
            className="rounded border"
          />
          <Badge className="absolute -top-2 -right-2 bg-green-600 text-white text-xs">
            {item.quantity}
          </Badge>
        </div>
        <div className="flex-1">
          <h3 className="font-medium text-sm">{item.title}</h3>
          <p className="text-sm text-gray-600">by {item.brand}</p>
          <div className="flex items-center space-x-2 mt-1">
            <span className="font-bold text-sm">
              ₹{formatIndianNumber(finalPrice.toFixed(2))}
            </span>
            {discount > 0 && (
              <span className="text-sm text-gray-500 line-through">
                ₹{formatIndianNumber(originalPrice.toFixed(2))}
              </span>
            )}
            {discount > 0 && (
              <Badge variant="secondary" className="text-green-600">
                {discount}% off
              </Badge>
            )}
          </div>
          <div className="flex items-center space-x-4 mt-2">
            <div className="flex items-center space-x-1">
              <Truck className="w-4 h-4 text-green-600" />
              <span className="text-sm text-green-600">FREE Delivery</span>
            </div>
            <span className="text-sm text-gray-600">Qty: {item.quantity}</span>
          </div>
        </div>
        <div className="text-right">
          <div className="font-bold">
            ₹{formatIndianNumber(totalFinal.toFixed(2))}
          </div>
          {discount > 0 && (
            <div className="text-sm text-green-600">
              You saved ₹{formatIndianNumber((totalOriginal - totalFinal).toFixed(2))}
            </div>
          )}
        </div>
      </div>
      {index < items.length - 1 && <Separator className="mt-4" />}
    </div>
  );
})}
              </CardContent>
            </Card>

            {/* Delivery Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Truck className="w-5 h-5" />
                  <span>Delivery Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium">Estimated Delivery</p>
                      <p className="text-sm text-gray-600">{estimatedDelivery}</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-orange-400 rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium">Shipping Address</p>
                      <p className="text-sm text-gray-600">
                        123 Main Street, Apartment 4B<br />
                        New Delhi, Delhi 110001<br />
                        India
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

       
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CreditCard className="w-5 h-5" />
                  <span>Order Summary</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal ({totalItems} items)</span>
                    <span>₹{formatIndianNumber(subtotal.toFixed(2))}</span>
                  </div>
                  
                  {savings > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Total Savings</span>
                      <span>-₹{formatIndianNumber(savings.toFixed(2))}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between">
                    <span>Delivery Fee</span>
                    <span className={deliveryFee === 0 ? "text-green-600" : ""}>
                      {deliveryFee === 0 ? "FREE" : `₹${formatIndianNumber(deliveryFee.toFixed(2))}`}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span>Tax (GST 18%)</span>
                    <span>₹{formatIndianNumber(tax.toFixed(2))}</span>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span className="text-orange-600">₹{formatIndianNumber(total.toFixed(2))}</span>
                  </div>
                  
                  {savings > 0 && (
                    <div className="text-sm text-green-600 text-center">
                      🎉 You saved ₹{formatIndianNumber(savings.toFixed(2))} on this order!
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

    
            <Card>
              <CardContent className="p-4 space-y-3">
                <Button className="w-full bg-orange-500 hover:bg-orange-600">
                  Track Your Order
                </Button>
                <Button variant="outline" className="w-full">
                  Download Invoice
                </Button>
                <Separator />
                <Link href="/">
                  <Button variant="outline" className="w-full">
                    Continue Shopping
                  </Button>
                </Link>
              </CardContent>
            </Card>

        
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4">
                <h3 className="font-medium mb-3">What's Next?</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-green-600" />
                    <span>Order confirmation sent to your email</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-green-600" />
                    <span>You'll receive tracking updates via SMS</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Package className="w-4 h-4 text-blue-600" />
                    <span>Package will be prepared for shipping</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}