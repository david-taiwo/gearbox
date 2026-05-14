import { useState, useMemo } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  FaStar,
  FaShoppingCart,
  FaHeart,
  FaFacebook,
  FaTwitter,
  FaShareAlt,
  FaLink,
  FaMinus,
  FaPlus,
  FaChevronRight,
  FaCheckCircle,
  FaTruck,
  FaShieldAlt,
  FaHeadphones,
  FaCreditCard,
} from "react-icons/fa";
import { products } from "../data/products";
import { reviews } from "../data/reviews";
import ProductCard from "../components/ui/ProductCard";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useToast } from "../context/ToastContext";

// ── STAR RATING ───
function StarRating({ rating, size = "sm" }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <FaStar
          key={star}
          className={`${size === "sm" ? "w-4 h-4" : "w-5 h-5"} ${
            star <= Math.round(rating) ? "text-yellow-400" : "text-gray-200"
          }`}
        />
      ))}
    </div>
  );
}

// ── REVIEW CARD ──────────────────────────────────────────────────────────────
function ReviewCard({ review }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4">
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          {/* Avatar */}
          <div className="w-9 h-9 rounded-full bg-[#2966DC] text-white flex items-center justify-center text-sm font-bold shrink-0">
            {review.userName.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-1">
              <span className="text-sm font-semibold text-gray-800">
                {review.userName}
              </span>
              {review.verified && (
                <FaCheckCircle className="w-3.5 h-3.5 text-green-500" />
              )}
            </div>
            <span className="text-xs text-gray-400">{review.date}</span>
          </div>
        </div>
        <StarRating rating={review.rating} />
      </div>
      <p className="text-sm text-gray-600 leading-relaxed">{review.comment}</p>
    </div>
  );
}

// ── SUBMIT REVIEW FORM ───────────────────────────────────────────────────────
function SubmitReviewForm({ onSubmit }) {
  const [rating, setRating] = useState(5);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState("");
  const { showToast } = useToast();

  function handleSubmit(e) {
    e.preventDefault();
    if (!comment.trim()) {
      showToast("Please write a review before submitting", "warning");
      return;
    }
    onSubmit({ rating, comment });
    setComment("");
    setRating(5);
    showToast("Review submitted successfully!", "success");
  }

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-5 mt-6">
      <h4 className="text-sm font-bold text-gray-800 mb-4">Write a Review</h4>

      {/* Interactive star selector */}
      <div className="flex items-center gap-1 mb-4">
        <span className="text-sm text-gray-600 mr-2">Your Rating:</span>
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onMouseEnter={() => setHoveredRating(star)}
            onMouseLeave={() => setHoveredRating(0)}
            onClick={() => setRating(star)}
          >
            <FaStar
              className={`w-6 h-6 transition-colors ${
                star <= (hoveredRating || rating)
                  ? "text-yellow-400"
                  : "text-gray-300"
              }`}
            />
          </button>
        ))}
      </div>

      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Write down your feedback about our product & services"
        rows={4}
        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm outline-none focus:border-[#2966DC] resize-none"
      />

      <button
        onClick={handleSubmit}
        className="mt-3 bg-[#2966DC] text-white px-6 py-2 rounded-md text-sm font-semibold hover:bg-blue-700 transition-colors"
      >
        PUBLISH REVIEW
      </button>
    </div>
  );
}

// ── MAIN PAGE ────────────────────────────────────────────────────────────────
function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, isInCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { showToast } = useToast();

  // Find the product by id from our data
  const product = products.find((p) => p.id === Number(id));

  // Active states
  const [activeImage, setActiveImage] = useState(0);
  const [activeTab, setActiveTab] = useState("description");
  const [selectedColor, setSelectedColor] = useState(
    product?.colors?.[0] || "",
  );
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || "");
  const [selectedStorage, setSelectedStorage] = useState(
    product?.storage?.[0] || "",
  );
  const [selectedMemory, setSelectedMemory] = useState(
    product?.memory?.[0] || "",
  );
  const [quantity, setQuantity] = useState(1);
  const [visibleReviews, setVisibleReviews] = useState(4);

  // Local reviews state so user submitted reviews appear immediately
  const [localReviews, setLocalReviews] = useState(
    reviews.filter((r) => r.productId === Number(id)),
  );

  // Similar products — same category, excluding current product
  const similarProducts = useMemo(
    () =>
      products
        .filter((p) => p.category === product?.category && p.id !== product?.id)
        .slice(0, 5),
    [product],
  );

  // Product not found
  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Product not found
        </h2>
        <Link to="/products" className="text-[#2966DC] hover:underline">
          Back to Products
        </Link>
      </div>
    );
  }

  function handleAddToCart() {
    if (product.isSoldOut) {
      showToast("This item is sold out!", "error");
      return;
    }
    addToCart(product, quantity);
    showToast(`${product.name.slice(0, 30)}... added to cart`, "success");
  }

  function handleBuyNow() {
    if (product.isSoldOut) {
      showToast("This item is sold out!", "error");
      return;
    }
    addToCart(product, quantity);
    navigate("/checkout");
  }

  function handleSubmitReview({ rating, comment }) {
    const newReview = {
      id: Date.now(),
      productId: product.id,
      userName: "You",
      avatar: null,
      rating,
      comment,
      date: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      verified: false,
    };
    setLocalReviews((prev) => [newReview, ...prev]);
  }

  const featureIcons = [
    { icon: FaShieldAlt, label: "Free 1 Year Warranty" },
    { icon: FaTruck, label: "Free Shipping & Fastest Delivery" },
    { icon: FaShieldAlt, label: "100% Money-back guarantee" },
    { icon: FaHeadphones, label: "24/7 Customer support" },
    { icon: FaCreditCard, label: "Secure payment method" },
  ];

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-360 mx-auto px-15 py-8">
        {/* ── Breadcrumb ── */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6 flex-wrap">
          <Link to="/" className="hover:text-[#2966DC]">
            Home
          </Link>
          <FaChevronRight className="w-3 h-3" />
          <Link to="/products" className="hover:text-[#2966DC]">
            Shop
          </Link>
          <FaChevronRight className="w-3 h-3" />
          <Link
            to={`/products?category=${encodeURIComponent(product.category)}`}
            className="hover:text-[#2966DC]"
          >
            {product.category}
          </Link>
          <FaChevronRight className="w-3 h-3" />
          <span className="text-[#2966DC] line-clamp-1">{product.name}</span>
        </nav>

        {/* ── Main product section ── */}
        <div className="flex gap-10 mb-12">
          {/* ── LEFT — Image gallery ── */}
          <div className="flex gap-4 w-105 shrink-0">
            {/* Thumbnails */}
            <div className="flex flex-col gap-2">
              {product.images.slice(0, 6).map((img, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImage(index)}
                  className={`w-16 h-16 border-2 rounded-md overflow-hidden bg-gray-50 p-1 transition-colors
                    ${
                      activeImage === index
                        ? "border-[#2966DC]"
                        : "border-gray-200 hover:border-gray-400"
                    }`}
                >
                  <img
                    src={img}
                    alt={`View ${index + 1}`}
                    className="w-full h-full object-contain"
                  />
                </button>
              ))}
            </div>

            {/* Main image */}
            <div className="flex-1 border border-gray-200 rounded-lg overflow-hidden bg-gray-50 flex items-center justify-center p-6 aspect-square">
              <img
                src={product.images[activeImage]}
                alt={product.name}
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          {/* ── RIGHT — Product info ── */}
          <div className="flex-1 min-w-0">
            {/* Rating */}
            <div className="flex items-center gap-2 mb-2">
              <StarRating rating={product.rating} />
              <span className="text-sm text-gray-500">
                {product.rating} Star Rating (
                {product.reviewCount?.toLocaleString()} User feedback)
              </span>
            </div>

            {/* Name */}
            <h1 className="text-xl font-bold text-gray-900 leading-snug mb-4">
              {product.name}
            </h1>

            {/* Meta info */}
            <div className="grid grid-cols-2 gap-x-8 gap-y-1 mb-4">
              <div className="flex gap-2 text-sm">
                <span className="text-gray-500">Sku:</span>
                <span className="text-gray-800 font-medium">{product.sku}</span>
              </div>
              <div className="flex gap-2 text-sm">
                <span className="text-gray-500">Availability:</span>
                <span
                  className={`font-medium ${product.inStock ? "text-green-600" : "text-red-500"}`}
                >
                  {product.inStock ? "In Stock" : "Out of Stock"}
                </span>
              </div>
              <div className="flex gap-2 text-sm">
                <span className="text-gray-500">Brand:</span>
                <span className="text-gray-800 font-medium">
                  {product.brand}
                </span>
              </div>
              <div className="flex gap-2 text-sm">
                <span className="text-gray-500">Category:</span>
                <span className="text-gray-800 font-medium">
                  {product.category}
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3 mb-5">
              <span className="text-2xl font-bold text-[#2966DC]">
                ${product.price.toLocaleString()}
              </span>
              {product.oldPrice && (
                <span className="text-lg text-gray-400 line-through">
                  ${product.oldPrice.toLocaleString()}
                </span>
              )}
              {product.discount && (
                <span className="bg-orange-100 text-orange-600 text-sm font-semibold px-2 py-0.5 rounded">
                  {product.discount}% OFF
                </span>
              )}
            </div>

            {/* ── Variants ── */}
            <div className="flex flex-col gap-4 mb-5">
              {/* Color selector */}
              {product.colors?.length > 0 && (
                <div>
                  <span className="text-sm font-semibold text-gray-700 mb-2 block">
                    Color:{" "}
                    <span className="font-normal text-gray-500">
                      {selectedColor}
                    </span>
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`px-3 py-1.5 text-sm border rounded-md transition-colors
                          ${
                            selectedColor === color
                              ? "border-[#2966DC] bg-blue-50 text-[#2966DC] font-medium"
                              : "border-gray-300 text-gray-600 hover:border-gray-400"
                          }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Size selector */}
              {product.sizes?.length > 0 && (
                <div>
                  <span className="text-sm font-semibold text-gray-700 mb-2 block">
                    Size:
                  </span>
                  <select
                    value={selectedSize}
                    onChange={(e) => setSelectedSize(e.target.value)}
                    className="border border-gray-300 rounded-md px-3 py-2 text-sm outline-none focus:border-[#2966DC] min-w-48"
                  >
                    {product.sizes.map((size) => (
                      <option key={size} value={size}>
                        {size}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Memory selector */}
              {product.memory?.length > 0 && (
                <div>
                  <span className="text-sm font-semibold text-gray-700 mb-2 block">
                    Memory:
                  </span>
                  <select
                    value={selectedMemory}
                    onChange={(e) => setSelectedMemory(e.target.value)}
                    className="border border-gray-300 rounded-md px-3 py-2 text-sm outline-none focus:border-[#2966DC] min-w-48"
                  >
                    {product.memory.map((mem) => (
                      <option key={mem} value={mem}>
                        {mem}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Storage selector */}
              {product.storage?.length > 0 && (
                <div>
                  <span className="text-sm font-semibold text-gray-700 mb-2 block">
                    Storage:
                  </span>
                  <select
                    value={selectedStorage}
                    onChange={(e) => setSelectedStorage(e.target.value)}
                    className="border border-gray-300 rounded-md px-3 py-2 text-sm outline-none focus:border-[#2966DC] min-w-48"
                  >
                    {product.storage.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            {/* Quantity + Buttons row */}
            <div className="flex items-center gap-3 mb-5 flex-wrap">
              {/* Quantity stepper */}
              <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3 py-2 hover:bg-gray-100 transition-colors"
                >
                  <FaMinus className="w-4 h-4" />
                </button>
                <span className="px-4 py-2 text-sm font-semibold border-x border-gray-300 min-w-12 text-center">
                  {String(quantity).padStart(2, "0")}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-3 py-2 hover:bg-gray-100 transition-colors"
                >
                  <FaPlus className="w-4 h-4" />
                </button>
              </div>

              {/* Add to Cart */}
              <button
                onClick={handleAddToCart}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-md text-sm font-semibold transition-colors
                  ${
                    product.isSoldOut
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : isInCart(product.id)
                        ? "bg-blue-100 text-[#2966DC] border border-[#2966DC]"
                        : "bg-[#2966DC] text-white hover:bg-blue-700"
                  }`}
              >
                <FaShoppingCart className="w-4 h-4" />
                {isInCart(product.id) ? "In Cart" : "ADD TO CART"}
              </button>

              {/* Buy Now */}
              <button
                onClick={handleBuyNow}
                className="px-6 py-2.5 rounded-md text-sm font-semibold border-2 border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white transition-colors"
              >
                BUY NOW
              </button>

              {/* Wishlist */}
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
                className={`p-2.5 rounded-md border transition-colors
                  ${
                    isInWishlist(product.id)
                      ? "border-red-300 bg-red-50 text-red-500"
                      : "border-gray-300 text-gray-600 hover:border-red-300 hover:text-red-500"
                  }`}
              >
                <FaHeart
                  className={`w-5 h-5 ${isInWishlist(product.id) ? "fill-red-500" : ""}`}
                />
              </button>
            </div>

            {/* Share */}
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-500">Share product:</span>
              <a
                href="#"
                className="text-gray-500 hover:text-[#2966DC] transition-colors"
              >
                <FaLink className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-blue-600 transition-colors"
              >
                <FaFacebook className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-sky-500 transition-colors"
              >
                <FaTwitter className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-pink-500 transition-colors"
              >
                <FaShareAlt className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* ── TABS SECTION ── */}
        <div className="border border-gray-200 rounded-lg overflow-hidden mb-12">
          {/* Tab buttons */}
          <div className="flex border-b border-gray-200">
            {["description", "feedback", "additional"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 text-sm font-medium transition-colors capitalize
                  ${
                    activeTab === tab
                      ? "border-b-2 border-[#2966DC] text-[#2966DC]"
                      : "text-gray-500 hover:text-gray-800"
                  }`}
              >
                {tab === "description" && "Descriptions"}
                {tab === "feedback" && "Customer Feedback"}
                {tab === "additional" && "Additional Information"}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div className="p-6">
            {/* ── Description tab ── */}
            {activeTab === "description" && (
              <div className="grid grid-cols-3 gap-8">
                {/* Description */}
                <div className="col-span-1">
                  <h3 className="text-base font-bold text-gray-800 mb-3">
                    Description
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                {/* Features */}
                <div className="col-span-1">
                  <h3 className="text-base font-bold text-gray-800 mb-3">
                    Feature
                  </h3>
                  <ul className="flex flex-col gap-3">
                    {featureIcons.map((feature) => {
                      const Icon = feature.icon;
                      return (
                        <li
                          key={feature.label}
                          className="flex items-center gap-2 text-sm text-gray-600"
                        >
                          <Icon className="w-4 h-4 text-[#2966DC] shrink-0" />
                          {feature.label}
                        </li>
                      );
                    })}
                  </ul>
                </div>

                {/* Shipping info */}
                <div className="col-span-1">
                  <h3 className="text-base font-bold text-gray-800 mb-3">
                    Shipping Information
                  </h3>
                  <div className="flex flex-col gap-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Courier:</span>
                      <span className="text-gray-700">
                        {product.shippingInfo.courier}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Local Shipping:</span>
                      <span className="text-gray-700">
                        {product.shippingInfo.local}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">
                        UPS Ground Shipping:
                      </span>
                      <span className="text-gray-700">
                        {product.shippingInfo.ups}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">
                        Unishop Global Export:
                      </span>
                      <span className="text-gray-700">
                        {product.shippingInfo.international}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ── Customer Feedback tab ── */}
            {activeTab === "feedback" && (
              <div>
                <h3 className="text-base font-bold text-gray-800 mb-4">
                  All Reviews ({localReviews.length})
                </h3>

                {localReviews.length > 0 ? (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      {localReviews.slice(0, visibleReviews).map((review) => (
                        <ReviewCard key={review.id} review={review} />
                      ))}
                    </div>

                    {/* Load More */}
                    {visibleReviews < localReviews.length && (
                      <button
                        onClick={() => setVisibleReviews((v) => v + 4)}
                        className="mt-4 text-sm text-[#2966DC] font-medium hover:underline"
                      >
                        Load More Reviews
                      </button>
                    )}
                  </>
                ) : (
                  <p className="text-sm text-gray-500">
                    No reviews yet. Be the first to review this product!
                  </p>
                )}

                {/* Submit review form */}
                <SubmitReviewForm
                  productId={product.id}
                  onSubmit={handleSubmitReview}
                />
              </div>
            )}

            {/* ── Additional Information tab ── */}
            {activeTab === "additional" && (
              <div>
                <h3 className="text-base font-bold text-gray-800 mb-4">
                  Product Specifications
                </h3>
                <table className="w-full text-sm">
                  <tbody>
                    {[
                      { label: "Brand", value: product.brand },
                      { label: "Model", value: product.model },
                      { label: "SKU", value: product.sku },
                      { label: "Weight", value: product.weight },
                      { label: "Dimensions", value: product.dimensions },
                      { label: "Category", value: product.category },
                      {
                        label: "Availability",
                        value: product.inStock ? "In Stock" : "Out of Stock",
                      },
                      product.colors?.length > 0 && {
                        label: "Available Colors",
                        value: product.colors.join(", "),
                      },
                      product.storage?.length > 0 && {
                        label: "Storage Options",
                        value: product.storage.join(", "),
                      },
                      product.memory?.length > 0 && {
                        label: "Memory Options",
                        value: product.memory.join(", "),
                      },
                    ]
                      .filter(Boolean)
                      .map(({ label, value }, index) => (
                        <tr
                          key={label}
                          className={
                            index % 2 === 0 ? "bg-gray-50" : "bg-white"
                          }
                        >
                          <td className="py-2.5 px-4 font-medium text-gray-600 w-48">
                            {label}
                          </td>
                          <td className="py-2.5 px-4 text-gray-800">{value}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* ── Similar Products ── */}
        {similarProducts.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                Similar Product
              </h2>
              <Link
                to={`/products?category=${encodeURIComponent(product.category)}`}
                className="text-sm text-[#2966DC] flex items-center gap-1 hover:underline"
              >
                View All <FaChevronRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {similarProducts.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  showRating={true}
                  badgeType="all"
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductDetailPage;
