import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { getTranslation } from "../../../../lib/translation";
import { Translation, Language } from "../../../../lib/translation";

const defaultLanguage: Language = "fr";

interface LanguageContextProps {
  language: Language;
  changeLanguage: (lang: Language) => void;
  translations: Translation;
}

const LanguageContext = createContext<LanguageContextProps>({
  language: defaultLanguage,
  changeLanguage: () => {},
  translations: getTranslation(defaultLanguage),
});

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [language, setLanguage] = useState<Language>(defaultLanguage);
  const [translations, setTranslations] = useState<Translation>(
    getTranslation(defaultLanguage),
  );

  const changeLanguage = (lang: Language) => {
    setLanguage(lang);
    setTranslations(getTranslation(lang));
  };

  useEffect(() => {
    setTranslations(getTranslation(language));
  }, [language]);

  return (
    <LanguageContext.Provider
      value={{ language, changeLanguage, translations }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
