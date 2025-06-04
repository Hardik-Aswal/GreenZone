"use client";

import { Star, ThumbsUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { reviewsData } from "../data/productData";

interface ProductReviewsProps {
  productId: string;
  rating: number;
  reviewCount: number;
}

export default function ProductReviews({ productId, rating, reviewCount }: ProductReviewsProps) {
  const reviews = reviewsData[productId] || [];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
      />
    ));
  };

  // Mock rating distribution
  const ratingDistribution = [
    { stars: 5, percentage: 65, count: Math.floor(reviewCount * 0.65) },
    { stars: 4, percentage: 20, count: Math.floor(reviewCount * 0.2) },
    { stars: 3, percentage: 10, count: Math.floor(reviewCount * 0.1) },
    { stars: 2, percentage: 3, count: Math.floor(reviewCount * 0.03) },
    { stars: 1, percentage: 2, count: Math.floor(reviewCount * 0.02) },
  ];

  return (
    <div className="space-y-6">
      {/* Rating Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Customer Reviews</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <div className="flex items-center">{renderStars(rating)}</div>
                <span className="text-2xl font-bold">{rating}</span>
                <span className="text-gray-600">out of 5</span>
              </div>
              <p className="text-sm text-gray-600">{reviewCount.toLocaleString()} global ratings</p>
            </div>

            <div className="space-y-2">
              {ratingDistribution.map((item) => (
                <div key={item.stars} className="flex items-center space-x-2 text-sm">
                  <span className="w-8">{item.stars} star</span>
                  <Progress value={item.percentage} className="flex-1 h-2" />
                  <span className="w-8 text-right">{item.percentage}%</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Individual Reviews */}
      <div className="space-y-4">
        {reviews.map((review) => (
          <Card key={review.id}>
            <CardContent className="p-6">
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">{review.userName}</span>
                      {review.verified && (
                        <Badge variant="secondary" className="text-xs">
                          Verified Purchase
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center">{renderStars(review.rating)}</div>
                      <span className="text-sm font-medium">{review.title}</span>
                    </div>
                    <p className="text-sm text-gray-600">{review.date}</p>
                  </div>
                </div>

                <p className="text-gray-700">{review.content}</p>

                <div className="flex items-center space-x-4 pt-2">
                  <Button variant="outline" size="sm" className="text-xs">
                    <ThumbsUp className="h-3 w-3 mr-1" />
                    Helpful ({review.helpful})
                  </Button>
                  <Button variant="ghost" size="sm" className="text-xs">
                    Report
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center">
        <Button variant="outline">Load More Reviews</Button>
      </div>
    </div>
  );
}
