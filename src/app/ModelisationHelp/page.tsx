"use client";
import { LanguageProvider, useLanguage } from "../_components/languageContext";

import React from "react";
import DarkModeToggle from "../_components/darkModeToogle";
import Footer from "../_components/footer";

const translations: Record<string, { greeting: string }> = {
  en: {
    greeting: "Hello",
  },
  fr: {
    greeting: "Bonjour",
  },
  es: {
    greeting: "Hola",
  },
  zh: {
    greeting: "你好",
  },
};

export default function ModelisationHelp() {
  const { language } = useLanguage();

  const translatedText = translations[language]!.greeting;

  return (
    <LanguageProvider>
      <div>
        <Footer />
        <div>{translatedText}</div>;
      </div>
    </LanguageProvider>
  );
}
