import { notFound } from "next/navigation";
import ProductPage from "../../components/productPage";
import { productData } from "../../data/productData";

interface ProductPageProps {
  params: Promise<{ productId: string }>;
}

export default async function Product({ params }: ProductPageProps) {
  const { productId } = await params;
  const product = productData[productId];

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <ProductPage product={product} />
    </div>
  );
}

export async function generateStaticParams() {
  return Object.keys(productData).map((productId) => ({
    productId,
  }));
}
