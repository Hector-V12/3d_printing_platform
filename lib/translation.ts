export interface Translation {
  userName: string;
  password: string;
  connexion: string;
  greeting: string;
  footerText: string;
}

export type Language = "en" | "fr" | "es" | "zh";

export const translations = {
  en: require("../src/app/locales/en.json"),
  fr: require("../src/app/locales/fr.json"),
  es: require("../src/app/locales/es.json"),
  zh: require("../src/app/locales/zh.json"),
};

export const getTranslation = (language: Language): Translation => {
  return translations[language] || translations["en"];
};
