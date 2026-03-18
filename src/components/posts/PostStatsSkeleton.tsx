"use client";

import { useTheme } from "../shared/ThemeProvider";

export default function PostStatsSkeleton() {
  const { colors } = useTheme();

  return (
    <div
      className="p-4 rounded-lg border animate-pulse"
      style={{
        backgroundColor: colors.card,
        borderColor: `${colors.border}50`,
      }}
    >
      {/* Title skeleton */}
      <div
        className="h-5 w-1/3 rounded mb-3"
        style={{ backgroundColor: `${colors.textMuted}30` }}
      />

      {/* Stats skeleton - 2 items */}
      {[...Array(2)].map((_, i) => (
        <div key={i} className="mb-4">
          <div className="flex justify-between mb-1">
            <div
              className="h-3 w-1/4 rounded"
              style={{ backgroundColor: `${colors.textMuted}20` }}
            />
            <div
              className="h-3 w-1/6 rounded"
              style={{ backgroundColor: `${colors.textMuted}20` }}
            />
          </div>
          <div
            className="h-2 rounded-full overflow-hidden"
            style={{ backgroundColor: `${colors.border}30` }}
          >
            <div
              className="h-full rounded-full"
              style={{
                backgroundColor: `${colors.textMuted}30`,
                width: "50%",
              }}
            />
          </div>
        </div>
      ))}

      {/* Post ID skeleton */}
      <div
        className="h-3 w-1/2 rounded mt-3"
        style={{ backgroundColor: `${colors.textMuted}15` }}
      />
    </div>
  );
}
