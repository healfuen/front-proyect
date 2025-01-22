import React, { createContext, useState, useEffect } from "react";
import { login as loginUser, logout as logoutUser, getUser, register as registerUser } from "../api/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    await loginUser(email, password);
    const userData = await getUser();
    setUser(userData);
  };

  const signup = async (name, email, password) => {
    await registerUser(name, email, password);
    await login(email, password);
  };

  const logout = async () => {
    await logoutUser();
    localStorage.removeItem("token");
    setUser(null);
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUser();
        setUser(userData);
      } catch {
        setUser(null);
      }
    };
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);
