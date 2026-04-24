import { createContext, useContext, useState, useCallback } from "react";

const ToastContext = createContext();

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  // useCallback prevents this function from being recreated on every render
  const showToast = useCallback((message, type = "info") => {
    // Create a unique id for each toast using the current timestamp
    const id = Date.now();

    // Add the new toast to the list
    setToasts((prev) => [...prev, { id, message, type }]);

    // Automatically remove it after 3 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {/* Toast container — fixed to bottom right of screen */}
      <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-2">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg text-gray-900 text-sm font-medium
              min-w-64 max-w-80 animate-fade-in
              ${toast.type === "error" ? "bg-red-500/40" : ""}
              ${toast.type === "success" ? "bg-green-500/40" : ""}
              ${toast.type === "info" ? "bg-[#2966DC]/40" : ""}
              ${toast.type === "warning" ? "bg-orange-500/40" : ""}
            `}
          >
            {/* Icon based on type */}
            <span className="text-lg shrink-0">
              {toast.type === "error" && "✕"}
              {toast.type === "success" && "✓"}
              {toast.type === "info" && "ℹ"}
              {toast.type === "warning" && "⚠"}
            </span>

            {/* Message */}
            <span className="flex-1">{toast.message}</span>

            {/* Manual close button */}
            <button
              onClick={() =>
                setToasts((prev) => prev.filter((t) => t.id !== toast.id))
              }
              className="text-white/70 hover:text-white transition-colors shrink-0"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}
