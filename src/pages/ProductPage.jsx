import { useMemo } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { X } from "lucide-react";
import ProductsSidebar from "../components/common/ProductsSidebar";
import ProductCard from "../components/ui/ProductCard";
import { products } from "../data/products";

// How many products per page
const PRODUCTS_PER_PAGE = 12;

function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Read all active filters from the URL
  const selectedCategory = searchParams.get("category") || "";
  const selectedSub = searchParams.get("sub") || "";
  const selectedBrands = searchParams.getAll("brand");
  const selectedRating = searchParams.get("rating") || "";
  const maxPrice = Number(searchParams.get("maxPrice")) || 5000;
  const hasDiscount = searchParams.get("discount") === "true";
  const searchQuery = searchParams.get("search") || "";
  const currentPage = Number(searchParams.get("page")) || 1;

  // ── FILTERING LOGIC ──────────────────────────────────────────────────────
  // useMemo means this only recalculates when searchParams changes
  // not on every single render — good for performance
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Category filter
      if (selectedCategory && product.category !== selectedCategory)
        return false;

      // Subcategory filter
      if (selectedSub && product.subcategory !== selectedSub) return false;

      // Brand filter
      if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand))
        return false;

      // Price filter
      if (product.price > maxPrice) return false;

      // Discount filter
      if (hasDiscount && !product.discount) return false;

      // Rating filter
      if (selectedRating && product.rating < Number(selectedRating))
        return false;

      // Search query filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesBrand = product.brand.toLowerCase().includes(query);
        const matchesTags = product.tags.some((tag) => tag.includes(query));
        if (!matchesName && !matchesBrand && !matchesTags) return false;
      }

      return true;
    });
  }, [
    selectedCategory,
    selectedSub,
    selectedBrands,
    selectedRating,
    maxPrice,
    hasDiscount,
    searchQuery,
  ]);

  // ── PAGINATION ───────────────────────────────────────────────────────────
  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE,
  );

  function goToPage(page) {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("page", page);
    setSearchParams(newParams);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // ── ACTIVE FILTER TAGS ───────────────────────────────────────────────────
  // Build a list of active filters to show as removable tags
  const activeFilters = [];
  if (selectedCategory)
    activeFilters.push({ label: selectedCategory, key: "category" });
  if (selectedSub) activeFilters.push({ label: selectedSub, key: "sub" });
  if (selectedRating)
    activeFilters.push({ label: `${selectedRating}★ & up`, key: "rating" });
  if (hasDiscount) activeFilters.push({ label: "On Sale", key: "discount" });
  if (searchQuery)
    activeFilters.push({ label: `"${searchQuery}"`, key: "search" });
  selectedBrands.forEach((brand) =>
    activeFilters.push({ label: brand, key: "brand", value: brand }),
  );

  function removeFilter(key, value) {
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      // For array params like brand, remove only the specific value
      const current = newParams.getAll(key).filter((v) => v !== value);
      newParams.delete(key);
      current.forEach((v) => newParams.append(key, v));
    } else {
      newParams.delete(key);
    }
    newParams.delete("page");
    setSearchParams(newParams);
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-360 mx-auto px-15 py-8">
        {/* ── Breadcrumb ── */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link to="/" className="hover:text-[#2966DC]">
            Home
          </Link>
          <span>›</span>
          <span className="text-gray-800">Shop</span>
          {selectedCategory && (
            <>
              <span>›</span>
              <span className="text-gray-800">{selectedCategory}</span>
            </>
          )}
          {selectedSub && (
            <>
              <span>›</span>
              <span className="text-[#2966DC]">{selectedSub}</span>
            </>
          )}
        </nav>

        <div className="flex gap-8">
          {/* ── Sidebar ── */}
          <ProductsSidebar />

          {/* ── Main content ── */}
          <div className="flex-1 min-w-0">
            {/* Active filter tags + results count */}
            <div className="flex flex-wrap items-center gap-2 mb-4">
              {activeFilters.length > 0 && (
                <span className="text-sm text-gray-500">Active Filters:</span>
              )}
              {activeFilters.map((filter, index) => (
                <span
                  key={index}
                  className="flex items-center gap-1 bg-blue-50 text-[#2966DC] text-xs font-medium px-2 py-1 rounded-full border border-blue-200"
                >
                  {filter.label}
                  <button
                    onClick={() => removeFilter(filter.key, filter.value)}
                    className="hover:text-red-500 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}

              {/* Results count — pushed to the right */}
              <span className="ml-auto text-sm text-gray-500">
                <span className="font-semibold text-gray-800">
                  {filteredProducts.length}
                </span>{" "}
                Results found
              </span>
            </div>

            {/* Product grid */}
            {paginatedProducts.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {paginatedProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    showRating={true}
                    badgeType="all"
                  />
                ))}
              </div>
            ) : (
              /* Empty state */
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <span className="text-6xl mb-4">🔍</span>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  No products found
                </h3>
                <p className="text-sm text-gray-500 mb-4">
                  Try adjusting your filters or search term
                </p>
                <button
                  onClick={() => setSearchParams({})}
                  className="bg-[#2966DC] text-white px-6 py-2 rounded-md text-sm font-semibold hover:bg-blue-700 transition-colors"
                >
                  Clear all filters
                </button>
              </div>
            )}

            {/* ── Pagination ── */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-8">
                {/* Previous button */}
                <button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center text-sm hover:border-[#2966DC] hover:text-[#2966DC] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  ‹
                </button>

                {/* Page numbers */}
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => goToPage(page)}
                      className={`w-9 h-9 rounded-full text-sm font-medium transition-colors
                      ${
                        currentPage === page
                          ? "bg-[#2966DC] text-white"
                          : "border border-gray-300 hover:border-[#2966DC] hover:text-[#2966DC]"
                      }`}
                    >
                      {page}
                    </button>
                  ),
                )}

                {/* Next button */}
                <button
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center text-sm hover:border-[#2966DC] hover:text-[#2966DC] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  ›
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductsPage;
