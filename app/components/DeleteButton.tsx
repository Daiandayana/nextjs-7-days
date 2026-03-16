"use client";

import { useTheme } from "./ThemeProvider";

export default function DeleteButton({ onClick, disabled }: { onClick: () => void; disabled?: boolean }) {
  const { colors } = useTheme();

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        padding: "0.5rem 1rem",
        backgroundColor: "#ef4444",
        color: "white",
        borderRadius: "0.5rem",
        border: "none",
        fontWeight: 500,
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1,
      }}
    >
      {disabled ? "Deleting..." : "Delete"}
    </button>
  );
}
