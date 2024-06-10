import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

interface UserData {
  id: number;
  name: string;
  surname: string;
  email: string;
  isAdmin: boolean;
  phoneNumber: string;
  orders: Order[];
}

export interface Order {
  id: number;
  commandTitle: string;
  quantity: number;
  usedSoftware: string;
  materialChoice: string;
  comment: string;
  orderDate: Date;
  userId: number;
  user: UserData;
  status: string;
}

interface AuthContextType {
  user: UserData | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserData | null>(null);
  const router = useRouter();

  const fetchUserData = async (token: string) => {
    try {
      const response = await axios.get("/api/user", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch user data");
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post("/api/auth/login", { email, password });
      const token = response.data.token;
      localStorage.setItem("userToken", token);
      const userData = await fetchUserData(token);
      router.push("/AdviceDesktop");
      setUser(userData);
    } catch (error) {
      throw new Error("Failed to login");
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("userToken");
    router.push("/Login");
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("userToken");
    if (storedToken) {
      const fetchData = async () => {
        try {
          const storedUserData = await fetchUserData(storedToken);
          setUser(storedUserData);
        } catch (error) {
          console.error("Error fetching user data:", error);
          logout(); // Log out user if error occurs during data fetching
        }
      };
      fetchData();
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