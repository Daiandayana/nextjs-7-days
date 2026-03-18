"use client";

import { useTheme } from "../shared/ThemeProvider";

export default function CommentSkeleton() {
  const { colors } = useTheme();

  return (
    <div
      className="p-4 rounded-lg mb-3 border animate-pulse"
      style={{
        backgroundColor: colors.bg,
        borderColor: `${colors.border}30`,
      }}
    >
      {/* Author skeleton */}
      <div
        className="h-5 w-1/4 rounded mb-2"
        style={{ backgroundColor: `${colors.textMuted}30` }}
      />
      
      {/* Content skeleton - 2 lines */}
      <div className="space-y-2">
        <div
          className="h-4 w-full rounded"
          style={{ backgroundColor: `${colors.textMuted}20` }}
        />
        <div
          className="h-4 w-3/4 rounded"
          style={{ backgroundColor: `${colors.textMuted}20` }}
        />
      </div>
    </div>
  );
}
