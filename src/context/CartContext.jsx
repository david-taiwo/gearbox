import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  // Load cart from localStorage on first render so cart persists on page refresh
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem("gearbox_cart");
    return saved ? JSON.parse(saved) : [];
  });

  // Save to localStorage every time cartItems changes
  useEffect(() => {
    localStorage.setItem("gearbox_cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // ── ACTIONS ──────────────────────────────────────────────────────────────

  function addToCart(product, quantity = 1) {
    setCartItems((prev) => {
      // Check if product already exists in cart
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        // If it exists, just increase the quantity
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      }
      // If it doesn't exist, add it as a new item
      return [...prev, { ...product, quantity }];
    });
  }

  function removeFromCart(productId) {
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
  }

  function updateQuantity(productId, newQuantity) {
    if (newQuantity < 1) {
      removeFromCart(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item,
      ),
    );
  }

  function clearCart() {
    setCartItems([]);
  }

  function isInCart(productId) {
    return cartItems.some((item) => item.id === productId);
  }

  // ── DERIVED VALUES ────────────────────────────────────────────────────────
  // These are calculated from cartItems automatically — no extra state needed

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const cartSubtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isInCart,
        cartCount,
        cartSubtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// Custom hook — this is what components import and use
export function useCart() {
  return useContext(CartContext);
}
