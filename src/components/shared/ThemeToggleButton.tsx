"use client";

import { useTheme } from "./ThemeProvider";

export default function ThemeToggleButton() {
  const { theme, toggleTheme, colors } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="px-4 py-2 rounded-lg font-medium transition-colors"
      style={{
        backgroundColor: colors.card,
        color: colors.text,
        border: `1px solid ${colors.accent}`,
      }}
    >
      {theme === "dark" ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
}
