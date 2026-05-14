import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";

const TAX_RATE = 0.08;

const countries = [
  "Nigeria",
  "United States",
  "United Kingdom",
  "Canada",
  "Australia",
  "Germany",
  "France",
  "India",
  "Ghana",
  "Kenya",
];

const paymentMethods = [
  { id: "cash", label: "Cash on Delivery" },
  { id: "paypal", label: "Paypal" },
  { id: "amazon", label: "Amazon Pay" },
];

function CheckoutPage() {
  const { cartItems, cartSubtotal, clearCart } = useCart();
  const { showToast } = useToast();
  const navigate = useNavigate();

  // ── Form state ────────────────────────────────────────────────────────────
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    company: "",
    street: "",
    country: "",
    region: "",
    zip: "",
    email: "",
    phone: "",
    shipDifferent: false,
    orderNotes: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ── Calculations ──────────────────────────────────────────────────────────
  const tax = cartSubtotal * TAX_RATE;
  const total = cartSubtotal + tax;

  // ── Handlers ──────────────────────────────────────────────────────────────
  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function validateForm() {
    const required = [
      "firstName",
      "lastName",
      "street",
      "country",
      "email",
      "phone",
    ];
    for (const field of required) {
      if (!form[field].trim()) {
        showToast(
          `Please fill in your ${field.replace(/([A-Z])/g, " $1").toLowerCase()}`,
          "warning",
        );
        return false;
      }
    }
    // Basic email validation
    if (!/\S+@\S+\.\S+/.test(form.email)) {
      showToast("Please enter a valid email address", "warning");
      return false;
    }
    return true;
  }

  function handlePlaceOrder() {
    if (cartItems.length === 0) {
      showToast("Your cart is empty", "warning");
      return;
    }
    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate order processing
    setTimeout(() => {
      clearCart();
      setIsSubmitting(false);
      navigate("/order-success");
    }, 1500);
  }

  // ── Empty cart guard ──────────────────────────────────────────────────────
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center gap-4">
        <h2 className="text-xl font-bold text-gray-700">Your cart is empty</h2>
        <Link
          to="/products"
          className="bg-[#2966DC] text-white px-6 py-2.5 rounded-md text-sm font-semibold hover:bg-blue-700 transition-colors"
        >
          Continue Shopping
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
          <span className="text-[#2966DC]">Checkout</span>
        </nav>

        <div className="flex gap-6 items-start">
          {/* ── LEFT — Billing form ── */}
          <div className="flex-1 min-w-0 flex flex-col gap-6">
            {/* Billing Information */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-base font-bold text-gray-800 mb-5">
                Billing Information
              </h2>

              <div className="flex flex-col gap-4">
                {/* Name row */}
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="text-xs font-medium text-gray-600 mb-1 block">
                      First name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={form.firstName}
                      onChange={handleChange}
                      placeholder="First name"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm outline-none focus:border-[#2966DC]"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="text-xs font-medium text-gray-600 mb-1 block">
                      Last name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={form.lastName}
                      onChange={handleChange}
                      placeholder="Last name"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm outline-none focus:border-[#2966DC]"
                    />
                  </div>
                </div>

                {/* Company */}
                <div>
                  <label className="text-xs font-medium text-gray-600 mb-1 block">
                    Company Name{" "}
                    <span className="text-gray-400">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={form.company}
                    onChange={handleChange}
                    placeholder="Company name"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm outline-none focus:border-[#2966DC]"
                  />
                </div>

                {/* Street Address */}
                <div>
                  <label className="text-xs font-medium text-gray-600 mb-1 block">
                    Street Address
                  </label>
                  <input
                    type="text"
                    name="street"
                    value={form.street}
                    onChange={handleChange}
                    placeholder="Street address"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm outline-none focus:border-[#2966DC]"
                  />
                </div>

                {/* Country + Region + Zip */}
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="text-xs font-medium text-gray-600 mb-1 block">
                      Country
                    </label>
                    <select
                      name="country"
                      value={form.country}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm outline-none focus:border-[#2966DC] text-gray-600"
                    >
                      <option value="">Select...</option>
                      {countries.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex-1">
                    <label className="text-xs font-medium text-gray-600 mb-1 block">
                      Region / State
                    </label>
                    <input
                      type="text"
                      name="region"
                      value={form.region}
                      onChange={handleChange}
                      placeholder="Region / State"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm outline-none focus:border-[#2966DC]"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="text-xs font-medium text-gray-600 mb-1 block">
                      Zip Code
                    </label>
                    <input
                      type="text"
                      name="zip"
                      value={form.zip}
                      onChange={handleChange}
                      placeholder="Zip code"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm outline-none focus:border-[#2966DC]"
                    />
                  </div>
                </div>

                {/* Email + Phone */}
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="text-xs font-medium text-gray-600 mb-1 block">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="Email address"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm outline-none focus:border-[#2966DC]"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="text-xs font-medium text-gray-600 mb-1 block">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="Phone number"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm outline-none focus:border-[#2966DC]"
                    />
                  </div>
                </div>

                {/* Ship to different address */}
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="shipDifferent"
                    checked={form.shipDifferent}
                    onChange={handleChange}
                    className="accent-[#2966DC]"
                  />
                  <span className="text-sm text-gray-600">
                    Ship into different address
                  </span>
                </label>
              </div>
            </div>

            {/* Additional Information */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-base font-bold text-gray-800 mb-4">
                Additional Information
              </h2>
              <label className="text-xs font-medium text-gray-600 mb-1 block">
                Order Notes <span className="text-gray-400">(Optional)</span>
              </label>
              <textarea
                name="orderNotes"
                value={form.orderNotes}
                onChange={handleChange}
                placeholder="Notes about your order, e.g. special notes for delivery"
                rows={4}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm outline-none focus:border-[#2966DC] resize-none"
              />
            </div>
          </div>

          {/* ── RIGHT — Order Summary ── */}
          <div className="w-80 shrink-0 bg-white rounded-lg border border-gray-200 p-5 sticky top-24">
            <h3 className="text-base font-bold text-gray-800 mb-4">
              Order Summary
            </h3>

            {/* Cart items list */}
            <div className="flex flex-col gap-3 mb-4 max-h-48 overflow-y-auto">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center gap-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-10 h-10 object-contain bg-gray-50 rounded border border-gray-200 p-0.5 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-700 line-clamp-1">
                      {item.name}
                    </p>
                    <p className="text-xs text-[#2966DC] font-semibold">
                      {item.quantity} x ${item.price.toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200 pt-4 flex flex-col gap-2 text-sm mb-4">
              <div className="flex justify-between text-gray-600">
                <span>Sub-total</span>
                <span className="font-medium">
                  ${cartSubtotal.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span className="font-medium text-green-600">Free</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Tax (8%)</span>
                <span className="font-medium">${tax.toFixed(2)}</span>
              </div>
              <div className="border-t border-gray-200 pt-2 flex justify-between font-bold text-gray-900">
                <span>Total</span>
                <span>${total.toFixed(2)} USD</span>
              </div>
            </div>

            {/* Payment Method */}
            <div className="mb-5">
              <h4 className="text-sm font-bold text-gray-800 mb-3">
                Payment Method
              </h4>
              <div className="flex flex-col gap-2">
                {paymentMethods.map((method) => (
                  <label
                    key={method.id}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="payment"
                      value={method.id}
                      checked={paymentMethod === method.id}
                      onChange={() => setPaymentMethod(method.id)}
                      className="accent-[#2966DC]"
                    />
                    <span className="text-sm text-gray-600">
                      {method.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Place Order button */}
            <button
              onClick={handlePlaceOrder}
              disabled={isSubmitting}
              className="w-full bg-[#1a1a2e] text-white py-3 rounded-md text-sm font-semibold hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Processing...
                </>
              ) : (
                "PLACE ORDER →"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;
