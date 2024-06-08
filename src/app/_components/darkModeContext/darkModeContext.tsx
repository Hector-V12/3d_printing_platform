"use client";

import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";

// Define the context properties interface
interface DarkModeContextProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const defaultDarkModeContext = false;
// Create the context with default values
const DarkModeContext = createContext<DarkModeContextProps | boolean>(false);

// Define the provider properties interface
interface DarkModeProviderProps {
  children: ReactNode;
}

// Create the DarkModeProvider component
export const DarkModeProvider = ({ children }: DarkModeProviderProps) => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};

export const useDarkMode = () => {
  const context = useContext(DarkModeContext);
  if (context === undefined) {
    throw new Error("useDarkMode must be used within a DarkModeProvider");
  }
  return context;
};
