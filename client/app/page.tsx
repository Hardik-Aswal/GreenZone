
import HeroBanner from "./components/heroBanner";
import ProductGrid from "./components/productGrid";

export default function Home() {
  return (
    <>
      <div className="min-h-screen bg-gray-100 flex flex-col">
       
        <HeroBanner />
        <ProductGrid />

      </div>
    </>
  );
}
