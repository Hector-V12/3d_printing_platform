"use client";

import { AuthProvider } from "./_components/authContext/authContext";
import { DarkModeProvider } from "./_components/darkModeContext/darkModeContext";
import { LanguageProvider } from "./_components/languageContext/languageContext";

export function Providers({ children }: any) {
  return (
    <AuthProvider>
      <LanguageProvider>
        <DarkModeProvider>{children}</DarkModeProvider>
      </LanguageProvider>
    </AuthProvider>
  );
}
