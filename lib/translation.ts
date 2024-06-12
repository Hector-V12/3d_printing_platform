export interface Translation {
  userName: string;
  name: string;
  password: string;
  connexion: string;
  greeting: string;
  footerText: string;
  mailIsep: string;
  register: string;
  phoneNumber: string;
  orderHistory: string;
  commandTitle: string;
  commandTitleField: string;
  quantity: string;
  printingTechno: string;
  matChoice: string;
  matType: string;
  File: string;
  remark: string;
  fileImport: string;
  fileImportFail: string;
  modelHelp: string;
  addToCart: string;
  pendingOrder: string;
  order: string;
  account: string;
  paymentInfo: string;
  cardNumber: string;
  expirationDate: string;
  adress: string;
  city: string;
  commandRecap: string;
  ou: string;
  notification: string;
  surname: string;
  orderAgain: string;
  darkMode: string;
  lightMode: string;
  disconnect: string;
  placeholderEmail: string;
  placeholderPassword: string;
  placeholderName: string;
  placeholderSurname: string;
  placeholderPhone: string;
  alreadyHaveAccount: string;
  notHaveAccount: string;
  search: string;
  titleAdvice: string;
  contentAdvice: string;
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
