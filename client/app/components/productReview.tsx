"use client";

import { Star, ThumbsUp, User, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import type { Review } from "../types/product";

interface ProductReviewsProps {
  rating: number;
  reviewCount: number;
  reviews: Review[];
}

export default function ProductReviews({ rating, reviewCount, reviews }: ProductReviewsProps) {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
      />
    ));
  };

  const calculateRatingDistribution = () => {
    const distribution = [
      { stars: 5, count: 0 },
      { stars: 4, count: 0 },
      { stars: 3, count: 0 },
      { stars: 2, count: 0 },
      { stars: 1, count: 0 },
    ];

    reviews.forEach((review) => {
      const starIndex = distribution.findIndex((d) => d.stars === review.rating);
      if (starIndex !== -1) {
        distribution[starIndex].count++;
      }
    });

    return distribution.map((item) => ({
      ...item,
      percentage: reviewCount > 0 ? Math.round((item.count / reviewCount) * 100) : 0,
    }));
  };

  const ratingDistribution = calculateRatingDistribution();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getUserInitials = (userId: string) => {
    return userId.substring(0, 2).toUpperCase();
  };

  return (
    <div className="space-y-6">
      <Card className="py-10">
        <CardHeader>
          <CardTitle>Customer Reviews</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <div className="flex items-center">{renderStars(rating)}</div>
                <span className="text-2xl font-bold">{rating.toFixed(1)}</span>
                <span className="text-gray-600">out of 5</span>
              </div>
              <p className="text-sm text-gray-600">{reviewCount.toLocaleString()} customer ratings</p>
            </div>

            <div className="space-y-2">
              {ratingDistribution.map((item) => (
                <div key={item.stars} className="flex items-center space-x-2 text-sm">
                  <span className="w-2">{item.stars} </span>
                  <Star className="inline-block h-4 w-4 fill-yellow-400 text-yellow-400"></Star>

                  <Progress value={item.percentage} className="flex-1 h-2" />
                  <span className="w-12 text-right">{item.percentage}%</span>
                  <span className="w-8 text-right text-gray-500">({item.count})</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Customer Reviews</h3>

        {reviews.length === 0 ? (
          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-gray-500">No reviews yet. Be the first to review this product!</p>
            </CardContent>
          </Card>
        ) : (
          reviews.map((review) => (
            <Card key={review.id}>
              <CardContent className="p-6 py-2">
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                          <User className="h-5 w-5 text-gray-500" />
                        </div>

                        <div className="space-y-1">
                          <div className="flex items-center space-x-2">
                            <span className="font-medium">Customer {getUserInitials(review.userId)}</span>
                            {review.verified && (
                              <Badge variant="secondary" className="text-xs bg-green-100 text-green-700">
                                <CheckCircle className="h-3 w-3 mr-1" />
                                Verified Purchase
                              </Badge>
                            )}
                          </div>

                          <div className="flex items-center space-x-2">
                            <div className="flex items-center">{renderStars(review.rating)}</div>
                            <span className="text-sm font-medium">{review.title}</span>
                          </div>

                          <p className="text-sm text-gray-600">{formatDate(review.date)}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="ml-13">
                    <p className="text-gray-700 leading-relaxed">{review.content}</p>

                    <div className="flex items-center space-x-4 pt-3 mt-3 border-t border-gray-100">
                      <Button variant="outline" size="sm" className="text-xs">
                        <ThumbsUp className="h-3 w-3 mr-1" />
                        Helpful ({review.helpful})
                      </Button>
                      <Button variant="ghost" size="sm" className="text-xs text-gray-500">
                        Report
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      <div className="text-center pt-4">
        <Button variant="outline" className="mb-4">
          Write a Review
        </Button>

        {reviews.length > 5 && <Button variant="outline">Load More Reviews</Button>}
      </div>

      <Card className="bg-gray-50">
        <CardContent className="p-4 py-0">
          <h4 className="font-semibold mb-2 text-sm">Review Guidelines</h4>
          <ul className="text-xs text-gray-600 space-y-1">
            <li>• Share your honest experience with the product</li>
            <li>• Focus on product features and quality</li>
            <li>• Be respectful and constructive</li>
            <li>• Verified purchases are marked with a badge</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
