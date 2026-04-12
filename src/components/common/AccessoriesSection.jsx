import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import ProductCard from "../ui/ProductCard";
import { products } from "../../data/products";

// Filter only Computer Accessories category products
const accessoryProducts = products.filter(
  (p) => p.category === "Computer Accessories",
);

function AccessoriesSection() {
  // Show max 6 products — matching the Figma design
  const visibleProducts = accessoryProducts.slice(0, 6);

  return (
    <section className="w-full bg-white py-10 border-t border-gray-100">
      <div className="max-w-360 mx-auto px-15">
        {/* ── Section Header ── */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">
            Computer Accessories
          </h2>
          <Link
            to="/products?category=Computer+Accessories"
            className="text-sm text-[#2966DC] font-medium flex items-center gap-1 hover:underline"
          >
            View All <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* ── Product Grid ── */}
        {/* 6 columns on large screens, 3 on medium, 2 on small */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {visibleProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              showRating={true}
              showBadge={true}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default AccessoriesSection;
