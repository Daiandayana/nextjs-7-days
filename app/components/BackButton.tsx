"use client";

import { useTheme } from "./ThemeProvider";

export default function BackButton({ onClick }: { onClick: () => void }) {
  const { colors } = useTheme();

  return (
    <button
      onClick={onClick}
      style={{
        padding: "0.5rem 1rem",
        backgroundColor: "#4b5563",
        color: "white",
        borderRadius: "0.5rem",
        border: "none",
        fontWeight: 500,
        cursor: "pointer",
      }}
    >
      ← Back
    </button>
  );
}
