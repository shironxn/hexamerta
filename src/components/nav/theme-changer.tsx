"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

const ThemeChanger = () => {
  const { theme, setTheme } = useTheme();

  return (
    <label className="swap swap-rotate">
      <input
        type="checkbox"
        onChange={() => setTheme(theme === "dark" ? "light" : "dark")}
      />
      <Sun className="swap-off fill-current w-8 h-8" />
      <Moon className="swap-on fill-current w-8 h-8" />
    </label>
  );
};

export { ThemeChanger };
