"use client";

import { Users, Package, CheckCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useAppSelector } from "../store/hooks";

export default function GroupOrderProgress() {
  const { groupedOrders, targetOrders, isGroupComplete } = useAppSelector((state) => state.groupOrder);

  const currentCount = groupedOrders.length;
  const progressPercentage = (currentCount / targetOrders) * 100;
  const remainingOrders = targetOrders - currentCount;

  return (
    <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-4 mb-4">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="p-1.5 bg-green-100 rounded-full">
              <Users className="h-4 w-4 text-green-600" />
            </div>
            <span className="text-sm font-medium text-green-800">Group Order Progress</span>
          </div>
          {isGroupComplete && (
            <Badge className="bg-green-600 hover:bg-green-700">
              <CheckCircle className="h-3 w-3 mr-1" />
              Ready to Order!
            </Badge>
          )}
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">
              <Package className="h-4 w-4 inline mr-1" />
              {currentCount} of {targetOrders} orders grouped
            </span>
            <span className="font-medium text-green-700">
              {remainingOrders > 0 ? `${remainingOrders} more needed` : "Complete!"}
            </span>
          </div>

          <div className="relative">
            <Progress value={progressPercentage} className="h-3 bg-green-100" />
            <div
              className="absolute top-0 left-0 h-3 bg-gradient-to-r from-green-400 to-green-600 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs text-green-700">
          <div className="flex items-center space-x-1">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
            <span>Extra 5% discount</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
            <span>Free express delivery</span>
          </div>
        </div>

        {!isGroupComplete && (
          <div className="text-center">
            <p className="text-xs text-green-600 font-medium">
              {remainingOrders === 1
                ? "Just 1 more order to unlock group benefits!"
                : `Add ${remainingOrders} more orders to unlock group benefits!`}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
