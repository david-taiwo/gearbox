import { createContext, useContext, useState, useEffect } from "react";

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [wishlistItems, setWishlistItems] = useState(() => {
    const saved = localStorage.getItem("gearbox_wishlist");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("gearbox_wishlist", JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  // ── ACTIONS ──────────────────────────────────────────────────────────────

  function addToWishlist(product) {
    setWishlistItems((prev) => {
      // Don't add duplicates
      if (prev.find((item) => item.id === product.id)) return prev;
      return [...prev, product];
    });
  }

  function removeFromWishlist(productId) {
    setWishlistItems((prev) => prev.filter((item) => item.id !== productId));
  }

  function toggleWishlist(product) {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  }

  function isInWishlist(productId) {
    return wishlistItems.some((item) => item.id === productId);
  }

  const wishlistCount = wishlistItems.length;

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
        isInWishlist,
        wishlistCount,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  return useContext(WishlistContext);
}
