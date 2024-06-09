"use client";

import { AuthProvider } from "./_components/authContext/authContext";
import { DarkModeProvider } from "./_components/darkModeContext/darkModeContext";
import { LanguageProvider } from "./_components/languageContext/languageContext";

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <AuthProvider>
      <LanguageProvider>
        <DarkModeProvider>{children}</DarkModeProvider>
      </LanguageProvider>
    </AuthProvider>
  );
}
