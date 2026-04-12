import HeroSection from "../components/common/HeroSection";
import TrustBadges from "../components/common/TrustBadges";
import ProductCard from "../components/ui/ProductCard";
import { products } from "../data/products";

function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustBadges />
      {/* Temporary test — show first 4 products */}
      <div className="max-w-360 mx-auto px-15 py-10 grid grid-cols-4 gap-4">
        {products.slice(0, 4).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
}

export default HomePage;
