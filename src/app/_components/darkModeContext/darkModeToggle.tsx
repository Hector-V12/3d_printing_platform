"use client";

import React from "react";
import { useDarkMode } from "./darkModeContext";
import { useLanguage } from "../languageContext/languageContext";
import CustomButton from "../button";

const DarkModeToggle = () => {
  const { darkMode, toggleDarkMode } = useDarkMode();
  const { translations } = useLanguage();

  return (
    <CustomButton text={darkMode ? translations.lightMode : translations.darkMode} OnClick={toggleDarkMode} />
  );
};

export default DarkModeToggle;
