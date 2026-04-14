import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  // Load cart from localStorage on first  render, so cart persists on page refresh
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem("gearbox_cart");
    return saved ? JSON.parse(saved) : [];
  });

  // save to localStorage every time cartItems changes

  useEffect(() => {
    localStorage.setItem("gearbox_cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // ACTIONS

  function addToCart(product, quality = 1) {
    setCartItems((prev) => {
      // check if product already exists in the cart
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        // If it exixt, just increase the quantity
      }
    });
  }
}
