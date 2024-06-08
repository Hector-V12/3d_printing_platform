"use client";

import { DarkModeProvider } from "./_components/darkModeContext/darkModeContext";
import { LanguageProvider } from "./_components/languageContext/languageContext";

export function Providers({ children }: any) {
  return (
    <LanguageProvider>
      <DarkModeProvider>{children}</DarkModeProvider>
    </LanguageProvider>
  );
}
