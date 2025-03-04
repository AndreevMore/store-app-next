"use client";

import { useTheme } from "@/providers/ThemeContext";
import { Moon, Sun } from "lucide-react";

export default function ThemeSwitcher() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      className="cursor-pointer rounded-lg bg-gray-200 p-2 dark:bg-gray-800"
      onClick={toggleTheme}
    >
      {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
    </button>
  );
}
