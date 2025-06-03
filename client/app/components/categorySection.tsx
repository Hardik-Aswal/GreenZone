import type { ProductCategory } from "../types";
import ProductCard from "./productCard";

interface CategorySectionProps {
  category: ProductCategory;
}

export default function CategorySection({ category }: CategorySectionProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-gray-900">{category.title}</h2>
        {category.subtitle && <p className="text-sm text-gray-600 mt-1">{category.subtitle}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        {category.products.slice(0, 4).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {category.ctaText && (
        <a href={category.ctaLink} className="text-blue-600 hover:text-blue-800 text-sm font-medium hover:underline">
          {category.ctaText}
        </a>
      )}
    </div>
  );
}
