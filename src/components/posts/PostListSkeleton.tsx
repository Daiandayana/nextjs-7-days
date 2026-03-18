"use client";

import { useTheme } from "../shared/ThemeProvider";

export default function PostListSkeleton() {
  const { colors } = useTheme();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          className="p-4 rounded-lg border animate-pulse"
          style={{
            backgroundColor: colors.card,
            borderColor: `${colors.border}30`,
          }}
        >
          <div
            className="h-6 rounded mb-2"
            style={{
              backgroundColor: `${colors.textMuted}30`,
            }}
          />

          <div
            className="h-4 w-1/2 rounded"
            style={{ backgroundColor: `${colors.textMuted}20` }}
          />
        </div>
      ))}
    </div>
  );
}
