import HeroSection from "../components/common/HeroSection";
import TrustBadges from "../components/common/TrustBadges";
import ProductCard from "../components/ui/ProductCard";
import { products } from "../data/products";

function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustBadges />
      {/* Temporary test — show first 5 products */}
      <div className="max-w-360 mx-auto px-15 py-10 grid grid-cols-5 gap-0 gap-x-4">
        {products.slice(0, 10).map((p) => (
          <ProductCard product={p} showRating={false} badgeType="deals" />
        ))}
      </div>
      /
      {/* <div className="max-w-360 mx-auto px-15 py-10 grid grid-cols-5 gap-4">
        {products.slice(0, 5).map((p) => (
          <ProductCard product={p} showRating={false} showBadge={false} />
        ))}
      </div> */}
      {/* <div className="max-w-360 mx-auto px-15 py-10 grid grid-cols-5 gap-4">
        {products.slice(0, 30).map((p) => (
          <ProductCard product={p} showRating={true} badgeType="all" />
        ))}
      </div> */}
    </>
  );
}

export default HomePage;
