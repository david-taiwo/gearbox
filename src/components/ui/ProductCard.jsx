import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { useToast } from "../../context/ToastContext";

import { Link } from "react-router-dom";
import { Heart, ShoppingCart, Eye } from "lucide-react";

// ── STAR RATING SUB-COMPONENT ───
function StarRating({ rating, reviewCount, showCount = true }) {
  return (
    <div className="flex items-center gap-1">
      {/* Generate 5 stars, each filled based on rating */}
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-3.5 h-3.5 ${
            star <= Math.round(rating)
              ? "text-yellow-400 fill-yellow-400"
              : "text-gray-300 fill-gray-300"
          }`}
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      {/* Show review count only if showCount is true and reviewCount exists */}
      {showCount && reviewCount && (
        <span className="text-xs text-gray-500 ml-1">
          ({reviewCount.toLocaleString()})
        </span>
      )}
    </div>
  );
}

// ── BADGE SUB-COMPONENT ──
function Badge({ product, badgeType = "all" }) {
  if (product.isSoldOut) {
    return (
      <span className="absolute top-2 left-2 bg-gray-400 text-white text-xs font-bold px-2 py-0.5 ">
        SOLD OUT
      </span>
    );
  }
  // These only show when badgeType is "all"
  if (badgeType === "all") {
    if (product.isHot) {
      return (
        <span className="absolute top-2 left-2 bg-[#F48484] text-white text-xs font-bold px-2 py-0.5 ">
          HOT
        </span>
      );
    }
    if (product.isBestSeller) {
      return (
        <span className="absolute top-2 left-2 bg-[#86CBF8] text-white text-xs font-bold px-2 py-0.5 ">
          BEST
        </span>
      );
    }
  }
  // % OFF shows in both modes
  if (product.discount) {
    return (
      <span className="absolute top-2 left-2 bg-[#F4E9AF] text-white text-xs font-bold px-2 py-0.5 ">
        {product.discount}% OFF
      </span>
    );
  }
  if (badgeType === "all" && product.isNew) {
    return (
      <span className="absolute top-2 left-2 bg-[#2966DC] text-white text-xs font-bold px-2 py-0.5 ">
        NEW
      </span>
    );
  }
  return null;
}

// ── MAIN PRODUCT CARD ───
function ProductCard({
  product,
  showRating = true,
  showBadge = true,
  badgeType = "all",
}) {
  const { addToCart, isInCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const { showToast } = useToast();

  return (
    <div className="group relative bg-white border border-gray-200 hover:shadow-lg transition-shadow duration-300 overflow-hidden flex flex-col">
      {/* ── IMAGE AREA ── */}
      <div className="relative overflow-hidden  aspect-square">
        {/* Badge — HOT, SOLD OUT, % OFF etc */}
        {showBadge && <Badge product={product} badgeType={badgeType} />}

        {/* Sold out overlay */}
        {product.isSoldOut && (
          <div className="absolute inset-0 bg-gray-400/60 z-10" />
        )}

        {/* Product image */}
        <Link to={`/products/${product.id}`}>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
          />
        </Link>

        {/* ── Hover action icons ── */}
        <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
          {/* Wishlist button */}
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
            className={`w-8 h-8 bg-white rounded-full shadow flex items-center justify-center transition-colors
    ${
      isInWishlist(product.id)
        ? "bg-red-50 text-red-300"
        : "hover:bg-[#2966DC] hover:text-white"
    }`}
            title={
              isInWishlist(product.id)
                ? "Remove from Wishlist"
                : "Add to Wishlist"
            }
          >
            <Heart
              className={`w-4 h-4 ${isInWishlist(product.id) ? "fill-red-300" : ""}`}
            />
          </button>

          {/* Add to Cart button */}
          <button
            onClick={() => {
              if (product.isSoldOut) {
                showToast("Item is sold out!", "error");
                return;
              }
              addToCart(product);
              showToast(
                `${product.name.slice(0, 30)}... added to cart`,
                "success",
              );
            }}
            className={`w-8 h-8 bg-white rounded-full shadow flex items-center justify-center transition-colors
    ${
      isInCart(product.id)
        ? "bg-blue-50 text-[#2966DC]"
        : "hover:bg-[#2966DC] hover:text-white"
    }`}
            title={
              product.isSoldOut
                ? "Item sold out"
                : isInCart(product.id)
                  ? "Already in Cart"
                  : "Add to Cart"
            }
          >
            <ShoppingCart className="w-4 h-4" />
          </button>
          <Link
            to={`/products/${product.id}`}
            className="w-8 h-8 bg-white rounded-full shadow flex items-center justify-center hover:bg-[#2966DC] hover:text-white transition-colors"
            title="Quick View"
          >
            <Eye className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* ── PRODUCT INFO ── */}
      <div className="p-3 flex flex-col gap-1 flex-1">
        {/* Star rating — only shown if showRating is true AND product has a rating */}
        {showRating && product.rating && (
          <StarRating
            rating={product.rating}
            reviewCount={product.reviewCount}
          />
        )}

        {/* Product name — truncated to 2 lines */}
        <Link
          to={`/products/${product.id}`}
          className="text-sm text-gray-700 font-medium leading-snug line-clamp-2 hover:text-[#2966DC] transition-colors"
        >
          {product.name}
        </Link>

        {/* Price row */}
        <div className="flex items-center gap-2 mt-auto pt-1">
          <span className="text-base font-bold text-gray-900">
            ${product.price.toLocaleString()}
          </span>
          {/* Old price — only shown if it exists */}
          {product.oldPrice && (
            <span className="text-sm text-gray-400 line-through">
              ${product.oldPrice.toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
