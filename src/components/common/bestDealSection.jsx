import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import ProductCard from "../ui/ProductCard";
import { products } from "../../data/products";

// We show only products that have a discount or are sold out
// These are the "deals" — filtered straight from our products array
const dealProducts = products.filter((p) => p.discount || p.isSoldOut);

function BestDealsSection() {
  // The products currently visible — just a slice of dealProducts
  const visibleProducts = dealProducts.slice(0, 10);

  // Are there more products beyond what's currently shown?
  //   const hasMore = visibleCount < dealProducts.length;

  return (
    <section className="w-full bg-white py-10">
      <div className="max-w-360 mx-auto px-15">
        {/* ── Section Header ── */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">
            Get the Best Deal in Smart Devices
          </h2>
          <Link
            to="/products/best-deals"
            className="text-sm text-[#2966DC] font-medium flex items-center gap-1 hover:underline"
          >
            View All <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        {/* ── Product Grid ── */}
        {/* 5 columns on large screens, 2 on small screens */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-4">
          {visibleProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              showRating={false}
              badgeType="deals"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default BestDealsSection;
