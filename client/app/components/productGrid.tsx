import { useEffect, useState } from "react";
import { ProductDetail } from "../types/product";
import ProductCard from "./productCard";
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProductGrid() {
  const [products, setProducts] = useState<ProductDetail[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios
      .get<{
        status: number;
        success: boolean;
        response: { message: string; products: ProductDetail[] };
      }>("http://localhost:4000/api/products")
      .then((res) => {
        setProducts(res.data.response.products);
        // console.log("RES", res.data.response.products);
      })
      .catch((err) => {
        console.error("Failed to load products:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, idx) => (
          <div key={idx} className="flex flex-col items-center space-y-3">
            <Skeleton className="h-[125px] w-[250px] bg-gray-300 animate-pulse rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Featured Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
