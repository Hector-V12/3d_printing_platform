"use client";
import {
  LanguageProvider,
  useLanguage,
} from "../_components/languageContext/languageContext";

import React from "react";

import Footer from "../_components/footer";

const Test: Record<string, { greeting: string }> = {
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
  const { translations } = useLanguage();

  const translatedText = Test[language]!.greeting;

  return (
    <div>
      <Footer />
      <div>{translatedText}</div>;<div>{translations.greeting}</div>
    </div>
  );
}
