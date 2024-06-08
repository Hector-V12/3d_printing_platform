import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface UserData {
  id: number; // Assuming the user ID is of type number
  email: string;
  // Add other user properties here
}

interface AuthContextType {
  user: UserData | null;
  login: (userData: UserData, id: string, token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC = ({ children }: any) => {
  const [user, setUser] = useState<UserData | null>(null);
  const router = useRouter();

  const login = (userData: UserData, id: number, token: string) => {
    setUser(userData);
    localStorage.setItem("userToken", token);
    localStorage.setItem("userId", id.toString()); // Store user ID
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("userToken");
    localStorage.removeItem("userId"); // Remove user ID from local storage
    router.push("/Login");
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("userToken");
    const storedUserId = localStorage.getItem("userId"); // Retrieve user ID from local storage
    const storedUserData = localStorage.getItem("userData");
    if (storedToken && storedUserData && storedUserId) {
      setUser(JSON.parse(storedUserData));
    }
  }, []);

  const value: AuthContextType = {
    user,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
