import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ChevronUp, ChevronDown } from "lucide-react";
import { categories } from "../../data/categories";

// All brands derived from our categories data
const brands = [
  "Apple",
  "Samsung",
  "Dell",
  "Microsoft",
  "Sony",
  "Razer",
  "Logitech",
  "HP",
  "Xiaomi",
  "OnePlus",
  "Canon",
  "DJI",
  "JBL",
  "Anker",
  "Nintendo",
  "Meta",
  "Garmin",
];

const deliveryOptions = [
  { id: "xpress", label: "Xpress Delivery" },
  { id: "regular", label: "Regular Delivery" },
];

const ratingOptions = [5, 4, 3, 2, 1];

// Reusable collapsible section wrapper
function FilterSection({ title, children, defaultOpen = true }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-gray-200 py-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full text-left"
      >
        <span className="text-sm font-bold text-gray-800 uppercase tracking-wide">
          {title}
        </span>
        {isOpen ? (
          <ChevronUp className="w-4 h-4 text-gray-500" />
        ) : (
          <ChevronDown className="w-4 h-4 text-gray-500" />
        )}
      </button>
      {isOpen && <div className="mt-3">{children}</div>}
    </div>
  );
}

function ProductsSidebar() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Read current filter values from URL
  const selectedCategory = searchParams.get("category") || "";
  const selectedBrands = searchParams.getAll("brand");
  const selectedDelivery = searchParams.getAll("delivery");
  const selectedRating = searchParams.get("rating") || "";
  const minPrice = searchParams.get("minPrice") || "0";
  const maxPrice = searchParams.get("maxPrice") || "5000";
  const hasDiscount = searchParams.get("discount") === "true";

  // Helper — updates a single param while keeping all others
  function updateParam(key, value) {
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    // Reset to page 1 when filters change
    newParams.delete("page");
    setSearchParams(newParams);
  }

  // Toggle a value in a multi-select param (like brands)
  function toggleArrayParam(key, value) {
    const newParams = new URLSearchParams(searchParams);
    const current = newParams.getAll(key);
    if (current.includes(value)) {
      newParams.delete(key);
      current
        .filter((v) => v !== value)
        .forEach((v) => newParams.append(key, v));
    } else {
      newParams.append(key, value);
    }
    newParams.delete("page");
    setSearchParams(newParams);
  }

  function clearAllFilters() {
    setSearchParams({});
  }

  return (
    <aside className="w-64 shrink-0">
      {/* Search within sidebar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Category, Brand, etc."
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm outline-none focus:border-[#2966DC]"
          onChange={(e) => updateParam("search", e.target.value)}
          defaultValue={searchParams.get("search") || ""}
        />
      </div>

      {/* Clear all filters */}
      {searchParams.toString() && (
        <button
          onClick={clearAllFilters}
          className="text-xs text-red-500 hover:underline mb-2"
        >
          Clear all filters
        </button>
      )}

      {/* DELIVERY */}
      <FilterSection title="Delivery">
        {deliveryOptions.map((option) => (
          <label
            key={option.id}
            className="flex items-center gap-2 mb-2 cursor-pointer"
          >
            <input
              type="checkbox"
              checked={selectedDelivery.includes(option.id)}
              onChange={() => toggleArrayParam("delivery", option.id)}
              className="accent-[#2966DC]"
            />
            <span className="text-sm text-gray-600">{option.label}</span>
          </label>
        ))}
      </FilterSection>

      {/* CATEGORIES */}
      <FilterSection title="Categories">
        {categories.map((cat) => (
          <label
            key={cat.label}
            className="flex items-center gap-2 mb-2 cursor-pointer"
          >
            <input
              type="radio"
              name="category"
              checked={selectedCategory === cat.label}
              onChange={() => updateParam("category", cat.label)}
              className="accent-[#2966DC]"
            />
            <span className="text-sm text-gray-600">{cat.label}</span>
          </label>
        ))}
      </FilterSection>

      {/* PRICE RANGE */}
      <FilterSection title="Price Range">
        <div className="px-1">
          <input
            type="range"
            min="0"
            max="5000"
            value={maxPrice}
            onChange={(e) => updateParam("maxPrice", e.target.value)}
            className="w-full accent-[#2966DC]"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>${minPrice}</span>
            <span>${Number(maxPrice).toLocaleString()}</span>
          </div>
        </div>
      </FilterSection>

      {/* POPULAR BRANDS */}
      <FilterSection title="Popular Brands">
        <div className="grid grid-cols-2 gap-x-2">
          {brands.map((brand) => (
            <label
              key={brand}
              className="flex items-center gap-2 mb-2 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selectedBrands.includes(brand)}
                onChange={() => toggleArrayParam("brand", brand)}
                className="accent-[#2966DC]"
              />
              <span className="text-sm text-gray-600">{brand}</span>
            </label>
          ))}
        </div>
      </FilterSection>

        {/* DISCOUNT */}
        <FilterSection title="Discount">
          <label className="flex items-center justify-between cursor-pointer">
          <span className="text-sm text-gray-600">On Sale Only</span>
          <div
            onClick={() => updateParam("discount", hasDiscount ? "" : "true")}
            className={`w-10 h-5 rounded-full transition-colors cursor-pointer relative
              ${hasDiscount ? "bg-[#2966DC]" : "bg-gray-300"}`}
          >
            <div
              className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform
              ${hasDiscount ? "translate-x-5" : "translate-x-0.5"}`}
            />
          </div>
        </label>
      </FilterSection>

      {/* RATINGS */}
      <FilterSection title="Ratings">
        {ratingOptions.map((rating) => (
          <label
            key={rating}
            className="flex items-center gap-2 mb-2 cursor-pointer"
          >
            <input
              type="radio"
              name="rating"
              checked={selectedRating === String(rating)}
              onChange={() => updateParam("rating", String(rating))}
              className="accent-[#2966DC]"
            />
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  className={`w-3 h-3 ${star <= rating ? "fill-yellow-400 text-yellow-400" : "fill-gray-300 text-gray-300"}`}
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <span className="text-xs text-gray-500 ml-1">& up</span>
            </div>
          </label>
        ))}
      </FilterSection>
    </aside>
  );
}

export default ProductsSidebar;
