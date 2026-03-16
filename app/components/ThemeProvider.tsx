"use client";

import { useState, useEffect, createContext, useContext, ReactNode } from "react";

type Theme = "dark" | "light";

// Color schemes for each theme
const themeColors = {
  dark: {
    bg: "#0a1628",
    card: "#1e3a5f",
    text: "#f1f5f9",
    textMuted: "#94a3b8",
    accent: "#06b6d4",
    border: "#06b6d4",
  },
  light: {
    bg: "#1e3a5f",
    card: "#234e6e",
    text: "#ffffff",
    textMuted: "#cbd5e1",
    accent: "#22d3ee",
    border: "#22d3ee",
  },
};

interface ThemeColors {
  bg: string;
  card: string;
  text: string;
  textMuted: string;
  accent: string;
  border: string;
}

interface ThemeContextType {
  theme: Theme;
  colors: ThemeColors;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("theme") as Theme;
    if (saved) setTheme(saved);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const colors = themeColors[theme];

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <ThemeContext.Provider value={{ theme, colors, toggleTheme }}>
      <div
        style={{
          backgroundColor: colors.bg,
          minHeight: "100vh",
          transition: "background-color 0.3s ease",
          color: colors.text,
        }}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
}

export type { ThemeColors };
