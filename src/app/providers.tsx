"use client";

import { DarkModeProvider } from "./_components/darkModeContext";

export function Providers({ children }: any) {
  return <DarkModeProvider>{children}</DarkModeProvider>;
}
