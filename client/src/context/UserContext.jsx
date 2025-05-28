import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

// Create Context
export const UserContext = createContext();

// Create Provider
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Global user state
  const [loading, setLoading] = useState(true); // For initial fetch

  // Fetch current user from backend (if token cookie is present)
  const fetchUser = async () => {
    try {
      const res = await axios.get("http://localhost:8081/api/auth/me", {
        withCredentials: true,
      });
      setUser(res.data.user);
    } catch (err) {
      console.error("Auto-fetch failed:", err);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};
