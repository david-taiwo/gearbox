import HeroSection from "../components/common/HeroSection";
import TrustBadges from "../components/common/TrustBadges";
import BestDealsSection from "../components/common/bestDealSection";
import CategorySection from "../components/common/CategorySection";
import PromoBanner from "../components/common/PromoBanner";
import AccessoriesSection from "../components/common/AccessoriesSection";
import LatestNewsSection from "../components/common/LatestNewsSection";
// import ProductCard from "../components/ui/ProductCard";
// import { products } from "../data/products";

function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustBadges />
      <BestDealsSection />
      <CategorySection />
      <PromoBanner />
      <AccessoriesSection />
      <LatestNewsSection />
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
