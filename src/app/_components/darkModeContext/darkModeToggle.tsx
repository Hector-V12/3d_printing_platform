"use client";

import React from "react";
import { useDarkMode } from "./darkModeContext";
import { useLanguage } from "../languageContext/languageContext";

const DarkModeToggle = () => {
  const { darkMode, toggleDarkMode } = useDarkMode();
  const { translations } = useLanguage();

  return (
    <button
      onClick={toggleDarkMode}
      className="rounded bg-gray-200 p-2 dark:bg-green-400 dark:text-black"
    >
      {darkMode ? translations.lightMode : translations.darkMode}
    </button>
  );
};

export default DarkModeToggle;
