import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState("");
  const [token, setToken] = useState(null);

  // Load token from localStorage on initial render
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedEmail = localStorage.getItem("email");
    if (storedToken && storedEmail) {
      setToken(storedToken);
      setEmail(storedEmail);
      setIsAuthenticated(true);
    }
  }, []);

  // --- Signup function ---
  const signup = async (userEmail, password) => {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: userEmail, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.msg || "Signup failed");
    }

    return data;
  };

  // --- Login function ---
  const login = async (userEmail, password) => {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: userEmail, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.msg || "Login failed");
    }

    // Save token and email in state and localStorage
    setIsAuthenticated(true);
    setEmail(userEmail);
    setToken(data.access_token);
    localStorage.setItem("token", data.access_token);
    localStorage.setItem("email", userEmail);

    return data;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setEmail("");
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("email");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, email, token, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
