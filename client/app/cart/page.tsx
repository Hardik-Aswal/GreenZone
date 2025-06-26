"use client";
import Link from "next/link";
import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { removeItem, updateQuantity, clearCart } from "../store/cartSlice";
import { formatIndianNumber } from "@/lib/utils";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const dispatch = useAppDispatch();
  const { items, totalItems, totalAmount } = useAppSelector((s) => s.cart);
  const router = useRouter();
  if (items.length === 0) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <Link href="/">
          <Button className="bg-yellow-400 text-black hover:bg-yellow-500">Start Shopping</Button>
        </Link>
      </div>
    );
  }
  return (
    <div className="p-8 grid lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        {items.map((item) => {
          const originalPrice = item.originalPrice * 1.0;
          const discountAmount = (item.discount * originalPrice) / 100;
          const finalPrice = originalPrice - discountAmount;
          const totalOriginal = originalPrice * item.quantity * 1.0;
          const totalFinal = finalPrice * item.quantity * 1.0;
          const canDecrease = item.quantity > 1;
          console.log("prices", originalPrice, discountAmount, finalPrice, totalOriginal, totalFinal);
          return (
            <Card key={item.id}>
              <CardContent className="flex items-start space-x-4">
                <Link href={`/product/${item.id}`} className="flex-shrink-0">
                  <Image
                    src={item.images[0] ?? "/placeholder.svg"}
                    alt={item.title}
                    width={120}
                    height={120}
                    className="rounded border"
                  />
                </Link>
                <div className="flex-1">
                  <Link href={`/product/${item.id}`}>
                    <h3 className="text-lg font-medium">{item.title}</h3>
                  </Link>
                  <p className="text-sm text-gray-600">by {item.brand}</p>

                  <div className="flex items-center space-x-2 mt-2">
                    <button
                      onClick={() =>
                        canDecrease && dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))
                      }
                      disabled={!canDecrease}
                      className="p-1 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Minus className="h-4 w-4 cursor-pointer" />
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}
                      className="p-1"
                    >
                      <Plus className="h-4 w-4 cursor-pointer" />
                    </button>
                  </div>

                  <button
                    className="text-red-600 text-sm mt-2 flex items-center cursor-pointer"
                    onClick={() => dispatch(removeItem(item.id))}
                  >
                    <Trash2 className="mr-1 h-4 w-4 " /> Remove
                  </button>
                </div>
                <div className="text-right">
                  <div className="font-bold">₹{formatIndianNumber(totalFinal?.toFixed(2))}</div>
                  {item.discount > 0 && (
                    <div className="text-sm text-gray-500 line-through">
                      ₹{formatIndianNumber(totalOriginal?.toFixed(2))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card className="p-6">
        <h2 className="text-xl font-bold">Order Summary</h2>
        <div className="flex justify-between">
          <span>Subtotal ({totalItems} items)</span>
          <span>₹{formatIndianNumber((totalAmount ?? 0).toFixed(2))}</span>
        </div>
        <Separator />
        <Button className="w-full bg-yellow-400 text-black hover:bg-yellow-500 cursor-pointer">
          Proceed to Checkout
        </Button>
        <Button
          variant="destructive"
          className="w-full hover:bg-red-700 cursor-pointer"
          onClick={() => dispatch(clearCart())}
        >
          Clear Cart
        </Button>
        <Link href="/">
          <Button variant="outline" className="w-full cursor-pointer">
            Continue Shopping
          </Button>
        </Link>
      </Card>
    </div>
  );
}
