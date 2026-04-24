import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("gearbox_user");
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("gearbox_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("gearbox_user");
    }
  }, [user]);

  // ── ACTIONS ───
  function login(userData) {
    // In a real app this would call an API
    // For now we just store the user data directly
    setUser(userData);
  }

  function logout() {
    setUser(null);
  }

  function updateUser(updatedData) {
    setUser((prev) => ({ ...prev, ...updatedData }));
  }

  const isLoggedIn = user !== null;

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        updateUser,
        isLoggedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
