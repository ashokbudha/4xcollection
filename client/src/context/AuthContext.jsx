import { createContext, useContext, useState, useEffect } from "react";

import { getCurrentUser ,logout as logoutUser} from "../services/auth.service";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchCurrentUser = async () => {
    try {
      const response = await getCurrentUser();

      setUser(response.data);
    } catch (error) {
        console.error("Failed to fetch current user:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
  try {
    await logoutUser();
  } finally {
    setUser(null);
  }
};

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        fetchCurrentUser,
        logout,
       isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
