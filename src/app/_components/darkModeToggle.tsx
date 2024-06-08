"use client";

import React from "react";
import { useDarkMode } from "./darkModeContext";

const DarkModeToggle = () => {
  const { darkMode, toggleDarkMode } = useDarkMode();

  return (
    <button
      onClick={toggleDarkMode}
      className="rounded bg-gray-200 p-2 dark:bg-green-400"
    >
      {darkMode ? "Light Mode" : "Dark Mode"}
    </button>
  );
};

export default DarkModeToggle;
