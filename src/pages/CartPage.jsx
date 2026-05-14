import { Link, useNavigate } from "react-router-dom";
import { Minus, Plus, X, ShoppingBag, ArrowLeft } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";
import { useState } from "react";

// Valid coupon codes
const COUPONS = {
  GEARBOX10: 10,
  SAVE20: 20,
  WELCOME15: 15,
};

// Tax rate
const TAX_RATE = 0.08;

function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, clearCart, cartSubtotal } =
    useCart();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  // ── Calculations ──
  const discount = appliedCoupon
    ? (cartSubtotal * appliedCoupon.percent) / 100
    : 0;

  const tax = cartSubtotal * TAX_RATE;
  const total = cartSubtotal - discount + tax;

  // ── Coupon logic ──
  function handleApplyCoupon() {
    const code = couponCode.trim().toUpperCase();
    if (!code) {
      showToast("Please enter a coupon code", "warning");
      return;
    }
    if (COUPONS[code]) {
      setAppliedCoupon({ code, percent: COUPONS[code] });
      showToast(`Coupon applied! ${COUPONS[code]}% off your order`, "success");
    } else {
      showToast("Invalid coupon code", "error");
    }
  }

  function handleRemoveCoupon() {
    setAppliedCoupon(null);
    setCouponCode("");
    showToast("Coupon removed", "info");
  }

  // ── Empty cart state ──────────────────────────────────────────────────────
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center gap-4">
        <img
          src="/empty-cart.png"
          alt="Empty cart"
          className="w-32 h-32 object-contain opacity-50"
          onError={(e) => {
            e.target.style.display = "none";
          }}
        />
        <ShoppingBag className="w-20 h-20 text-gray-300" />
        <h2 className="text-xl font-bold text-gray-700">Your Cart is empty</h2>
        <p className="text-sm text-gray-500">Add products to your cart</p>
        <Link
          to="/products"
          className="bg-[#2966DC] text-white px-6 py-2.5 rounded-md text-sm font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          CONTINUE SHOPPING
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-360 mx-auto px-15">
        {/* ── Breadcrumb ── */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link to="/" className="hover:text-[#2966DC]">
            Home
          </Link>
          <span>›</span>
          <Link to="/account/dashboard" className="hover:text-[#2966DC]">
            User Account
          </Link>
          <span>›</span>
          <span className="text-[#2966DC]">Shopping Cart</span>
        </nav>

        <div className="flex gap-6 items-start">
          {/* ── LEFT — Cart table ── */}
          <div className="flex-1 min-w-0 flex flex-col gap-4">
            {/* Table */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              {/* Header */}
              <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                <div className="col-span-5">Products</div>
                <div className="col-span-2 text-center">Price</div>
                <div className="col-span-3 text-center">Quantity</div>
                <div className="col-span-1 text-center">Sub-Total</div>
                <div className="col-span-1" />
              </div>

              {/* Cart items */}
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-gray-100 items-center last:border-0"
                >
                  {/* Product info */}
                  <div className="col-span-5 flex items-center gap-3">
                    <Link to={`/products/${item.id}`}>
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-contain bg-gray-50 rounded-md border border-gray-200 p-1 shrink-0"
                      />
                    </Link>
                    <Link
                      to={`/products/${item.id}`}
                      className="text-sm text-gray-700 font-medium line-clamp-2 hover:text-[#2966DC] transition-colors"
                    >
                      {item.name}
                    </Link>
                  </div>

                  {/* Unit price */}
                  <div className="col-span-2 text-center text-sm font-medium text-gray-700">
                    ${item.price.toLocaleString()}
                  </div>

                  {/* Quantity stepper */}
                  <div className="col-span-3 flex items-center justify-center">
                    <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="px-2.5 py-1.5 hover:bg-gray-100 transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-3 py-1.5 text-sm font-semibold border-x border-gray-300 min-w-10 text-center">
                        {String(item.quantity).padStart(2, "0")}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="px-2.5 py-1.5 hover:bg-gray-100 transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  {/* Subtotal */}
                  <div className="col-span-1 text-center text-sm font-semibold text-gray-800">
                    ${(item.price * item.quantity).toLocaleString()}
                  </div>

                  {/* Remove button */}
                  <div className="col-span-1 flex justify-center">
                    <button
                      onClick={() => {
                        removeFromCart(item.id);
                        showToast("Item removed from cart", "info");
                      }}
                      className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center text-gray-400 hover:border-red-400 hover:text-red-500 transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Action buttons */}
            <div className="flex items-center justify-between">
              <Link
                to="/products"
                className="flex items-center gap-2 border border-gray-300 text-gray-700 px-5 py-2 rounded-md text-sm font-semibold hover:border-[#2966DC] hover:text-[#2966DC] transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                RETURN TO SHOP
              </Link>
              <Link
                to="/products"
                className="border border-gray-300 text-gray-700 px-5 py-2 rounded-md text-sm font-semibold hover:border-[#2966DC] hover:text-[#2966DC] transition-colors"
              >
                ADD MORE PRODUCTS
              </Link>
            </div>

            {/* Coupon code */}
            <div className="bg-white rounded-lg border border-gray-200 px-6 py-4 flex items-center gap-4">
              <span className="text-sm font-semibold text-gray-700 shrink-0">
                Coupon Code
              </span>

              {appliedCoupon ? (
                <div className="flex items-center gap-3 flex-1">
                  <span className="bg-green-100 text-green-700 text-sm font-semibold px-3 py-1 rounded-full">
                    {appliedCoupon.code} — {appliedCoupon.percent}% OFF
                  </span>
                  <button
                    onClick={handleRemoveCoupon}
                    className="text-xs text-red-500 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div className="flex flex-1 gap-3">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleApplyCoupon()}
                    placeholder="Enter Code"
                    className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm outline-none focus:border-[#2966DC]"
                  />
                  <button
                    onClick={handleApplyCoupon}
                    className="bg-[#2966DC] text-white px-5 py-2 rounded-md text-sm font-semibold hover:bg-blue-700 transition-colors shrink-0"
                  >
                    APPLY COUPON
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* ── RIGHT — Order Summary ── */}
          <div className="w-72 shrink-0 bg-white rounded-lg border border-gray-200 p-5 sticky top-24">
            <h3 className="text-base font-bold text-gray-800 mb-4">
              Card Totals
            </h3>

            {/* Line items */}
            <div className="flex flex-col gap-3 text-sm mb-4">
              <div className="flex justify-between text-gray-600">
                <span>Sub-total</span>
                <span className="font-medium text-gray-800">
                  ${cartSubtotal.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span className="font-medium text-green-600">Free</span>
              </div>
              {appliedCoupon && (
                <div className="flex justify-between text-gray-600">
                  <span>Discount ({appliedCoupon.percent}%)</span>
                  <span className="font-medium text-red-500">
                    -${discount.toFixed(2)}
                  </span>
                </div>
              )}
              <div className="flex justify-between text-gray-600">
                <span>Tax (8%)</span>
                <span className="font-medium text-gray-800">
                  ${tax.toFixed(2)}
                </span>
              </div>
              <div className="border-t border-gray-200 pt-3 flex justify-between font-bold text-gray-900">
                <span>Total</span>
                <span>${total.toFixed(2)} USD</span>
              </div>
            </div>

            {/* Checkout button */}
            <button
              onClick={() => navigate("/checkout")}
              className="w-full bg-[#1a1a2e] text-white py-3 rounded-md text-sm font-semibold hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
            >
              PROCEED TO CHECKOUT →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
