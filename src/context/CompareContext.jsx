import { createContext, useContext, useState } from "react";
import { useToast } from "./ToastContext";

const CompareContext = createContext();
const MAX_COMPARE = 4;

export function CompareProvider({ children }) {
  const [compareItems, setCompareItems] = useState([]);
  const { showToast } = useToast();

  function addToCompare(product) {
    if (compareItems.find((p) => p.id === product.id)) {
      showToast("Product already in compare list", "warning");
      return;
    }
    if (compareItems.length >= MAX_COMPARE) {
      showToast(
        `You can compare up to ${MAX_COMPARE} products only`,
        "warning",
      );
      return;
    }
    setCompareItems((prev) => [...prev, product]);
    showToast(`${product.name.slice(0, 25)}... added to compare`, "success");
  }

  function removeFromCompare(productId) {
    setCompareItems((prev) => prev.filter((p) => p.id !== productId));
  }

  function isInCompare(productId) {
    return compareItems.some((p) => p.id === productId);
  }

  function clearCompare() {
    setCompareItems([]);
  }

  return (
    <CompareContext.Provider
      value={{
        compareItems,
        addToCompare,
        removeFromCompare,
        isInCompare,
        clearCompare,
      }}
    >
      {children}
    </CompareContext.Provider>
  );
}

export function useCompare() {
  return useContext(CompareContext);
}
