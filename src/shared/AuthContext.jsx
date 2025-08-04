import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const login = (user) => {
    setIsAuthenticated(true);
    setUser(user);
    console.log("Logged in");
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    console.log("Logged out");
  };

  const value = { isAuthenticated, user, logout, login };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
