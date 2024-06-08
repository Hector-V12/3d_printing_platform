import React, { createContext, useState, useContext, ReactNode } from "react";

const defaultLanguage = "fr"; // Set a default language

// Define the shape of the context value
interface LanguageContextProps {
  language: string;
  changeLanguage: (lang: string) => void;
}

// Provide a default value for the context
const LanguageContext = createContext<LanguageContextProps>({
  language: defaultLanguage,
  changeLanguage: () => {},
});

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [language, setLanguage] = useState(defaultLanguage);

  const changeLanguage = (lang: string) => {
    setLanguage(lang);
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
