import { Link } from "react-router-dom";
import { X, ShoppingCart, Heart, ArrowLeft } from "lucide-react";
import { useCompare } from "../context/CompareContext";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useToast } from "../context/ToastContext";
import { products } from "../data/products";

// The rows to compare — label and which product field to read
const compareRows = [
  {
    label: "Customer Feedback",
    render: (p) => (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className={`w-4 h-4 ${
              star <= Math.round(p.rating)
                ? "fill-yellow-400 text-yellow-400"
                : "fill-gray-200 text-gray-200"
            }`}
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
        <span className="text-xs text-gray-500 ml-1">
          ({p.reviewCount?.toLocaleString()})
        </span>
      </div>
    ),
  },
  {
    label: "Price",
    render: (p) => (
      <div className="flex items-center gap-2">
        <span className="text-[#2966DC] font-bold">
          ${p.price.toLocaleString()}
        </span>
        {p.oldPrice && (
          <span className="text-gray-400 line-through text-sm">
            ${p.oldPrice.toLocaleString()}
          </span>
        )}
      </div>
    ),
  },
  {
    label: "Sold by",
    render: (p) => <span className="text-gray-700">{p.brand}</span>,
  },
  {
    label: "Brand",
    render: (p) => <span className="text-gray-700">{p.brand}</span>,
  },
  {
    label: "Model",
    render: (p) => <span className="text-gray-700">{p.model}</span>,
  },
  {
    label: "Stock status",
    render: (p) => (
      <span
        className={`font-semibold ${p.inStock ? "text-green-600" : "text-red-500"}`}
      >
        {p.inStock ? "IN STOCK" : "OUT OF STOCK"}
      </span>
    ),
  },
  {
    label: "Size",
    render: (p) =>
      p.sizes?.length > 0 ? (
        <span className="text-gray-700">{p.sizes.join(", ")}</span>
      ) : (
        <span className="text-gray-400">—</span>
      ),
  },
  {
    label: "Weight",
    render: (p) => <span className="text-gray-700">{p.weight}</span>,
  },
];

// Empty slot component
function EmptySlot() {
  return (
    <div className="flex-1 border-2 border-dashed border-gray-200 rounded-lg flex flex-col items-center justify-center py-16 min-h-64">
      <p className="text-sm text-gray-400 mb-3">Add a product to compare</p>
      <Link
        to="/products"
        className="text-xs text-[#2966DC] hover:underline font-medium"
      >
        Browse Products →
      </Link>
    </div>
  );
}

function ComparePage() {
  const { compareItems, removeFromCompare, clearCompare } = useCompare();
  const { addToCart, isInCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { showToast } = useToast();

  // How many empty slots to show — always show up to 4 total columns
  const emptySlots = Math.max(0, 2 - compareItems.length);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-360 mx-auto px-15">
        {/* ── Breadcrumb + actions ── */}
        <div className="flex items-center justify-between mb-6">
          <nav className="flex items-center gap-2 text-sm text-gray-500">
            <Link to="/" className="hover:text-[#2966DC]">
              Home
            </Link>
            <span>›</span>
            <span className="text-[#2966DC]">Compare</span>
          </nav>
          <Link
            to="/"
            className="text-sm text-[#2966DC] flex items-center gap-1 hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>

        {/* ── Empty state ── */}
        {compareItems.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 p-16 flex flex-col items-center gap-4">
            <span className="text-6xl">⚖️</span>
            <h2 className="text-xl font-bold text-gray-800">
              Nothing to compare yet
            </h2>
            <p className="text-sm text-gray-500">
              Add products using the compare button on any product card
            </p>
            <Link
              to="/products"
              className="bg-[#2966DC] text-white px-6 py-2.5 rounded-md text-sm font-semibold hover:bg-blue-700 transition-colors"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            {/* ── Clear all button ── */}
            <div className="flex justify-end px-6 pt-4">
              <button
                onClick={clearCompare}
                className="text-xs text-red-500 hover:underline"
              >
                Clear all
              </button>
            </div>

            {/* ── Product cards row ── */}
            <div className="flex gap-4 p-6 border-b border-gray-200">
              {/* Label column */}
              <div className="w-36 shrink-0" />

              {/* Product columns */}
              {compareItems.map((product) => (
                <div
                  key={product.id}
                  className="flex-1 relative flex flex-col items-center text-center gap-3"
                >
                  {/* Remove button */}
                  <button
                    onClick={() => removeFromCompare(product.id)}
                    className="absolute -top-1 right-0 w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center text-gray-400 hover:border-red-400 hover:text-red-500 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>

                  {/* Product image */}
                  <Link to={`/products/${product.id}`}>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-40 h-40 object-contain bg-gray-50 rounded-lg p-3 border border-gray-200 hover:border-[#2966DC] transition-colors"
                    />
                  </Link>

                  {/* Product name */}
                  <Link
                    to={`/products/${product.id}`}
                    className="text-sm font-medium text-gray-800 line-clamp-2 hover:text-[#2966DC] transition-colors px-2"
                  >
                    {product.name}
                  </Link>

                  {/* Action buttons */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        if (product.isSoldOut) {
                          showToast("Item is sold out!", "error");
                          return;
                        }
                        addToCart(product);
                        showToast("Added to cart", "success");
                      }}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-colors
                        ${
                          product.isSoldOut
                            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                            : isInCart(product.id)
                              ? "bg-blue-100 text-[#2966DC] border border-[#2966DC]"
                              : "bg-[#2966DC] text-white hover:bg-blue-700"
                        }`}
                    >
                      <ShoppingCart className="w-3 h-3" />
                      {isInCart(product.id) ? "In Cart" : "Add to Cart"}
                    </button>

                    <button
                      onClick={() => {
                        toggleWishlist(product);
                        showToast(
                          isInWishlist(product.id)
                            ? "Removed from wishlist"
                            : "Added to wishlist",
                          isInWishlist(product.id) ? "info" : "success",
                        );
                      }}
                      className={`p-1.5 rounded-md border transition-colors
                        ${
                          isInWishlist(product.id)
                            ? "border-red-300 bg-red-50 text-red-500"
                            : "border-gray-300 text-gray-500 hover:border-red-300 hover:text-red-500"
                        }`}
                    >
                      <Heart
                        className={`w-3.5 h-3.5 ${isInWishlist(product.id) ? "fill-red-500" : ""}`}
                      />
                    </button>
                  </div>
                </div>
              ))}

              {/* Empty slots */}
              {Array.from({ length: emptySlots }).map((_, i) => (
                <div key={i} className="flex-1">
                  <EmptySlot />
                </div>
              ))}
            </div>

            {/* ── Comparison rows ── */}
            {compareRows.map((row, rowIndex) => (
              <div
                key={row.label}
                className={`flex gap-4 px-6 py-4 ${rowIndex % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
              >
                {/* Row label */}
                <div className="w-36 shrink-0 flex items-center">
                  <span className="text-sm font-medium text-gray-600">
                    {row.label}:
                  </span>
                </div>

                {/* Product values */}
                {compareItems.map((product) => (
                  <div
                    key={product.id}
                    className="flex-1 flex items-center justify-center"
                  >
                    {row.render(product)}
                  </div>
                ))}

                {/* Empty slot placeholders */}
                {Array.from({ length: emptySlots }).map((_, i) => (
                  <div key={i} className="flex-1" />
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ComparePage;
