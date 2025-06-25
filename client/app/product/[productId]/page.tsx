"use client";

import { notFound, useParams } from "next/navigation";
import ProductPage from "../../components/productPage";
import { ProductDetail } from "@/app/types/product";
import { useEffect, useState } from "react";
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProductClientPage() {
  const { productId } = useParams();
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    axios
      .get<{
        status: number;
        success: boolean;
        response: { message: string; product: ProductDetail };
      }>(`http://localhost:4000/api/products/${productId}`)
      .then((res) => {
        if (res.data.success) {
          setProduct(res.data.response.product);
        } else {
          setHasError(true);
        }
      })
      .catch(() => {
        setHasError(true);
      });
  }, [productId]);

  if (hasError) {
    notFound();
  }

  if (product === null) {
    return (
      <div className="my-14 flex flex-col items-center space-y-3">
        <Skeleton className="h-[125px] w-[250px] bg-gray-300 animate-pulse rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <ProductPage product={product} />
    </div>
  );
}
