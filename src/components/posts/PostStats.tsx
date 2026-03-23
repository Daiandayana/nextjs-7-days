"use client";

import { useTheme } from "../shared/ThemeProvider";

interface PostStatsProps {
  postId: string;
  viewCount: number;
  commentCount: number;
}

export default function PostStats({ postId, viewCount, commentCount }: PostStatsProps) {
  const { colors } = useTheme();

  // Simulate heavy computation (e.g., chart rendering)
  const stats = [
    { label: "Views", value: viewCount, percentage: Math.min((viewCount / 1000) * 100, 100) },
    { label: "Comments", value: commentCount, percentage: Math.min((commentCount / 100) * 100, 100) },
  ];

  return (
    <div
      className="p-4 rounded-lg border"
      style={{
        backgroundColor: colors.card,
        borderColor: `${colors.border}50`,
      }}
    >
      <h4
        className="font-semibold mb-3"
        style={{ color: colors.text }}
      >
        Post Statistics
      </h4>
      
      <div className="space-y-4">
        {stats.map((stat) => (
          <div key={stat.label}>
            <div className="flex justify-between text-sm mb-1">
              <span style={{ color: colors.textMuted }}>{stat.label}</span>
              <span style={{ color: colors.text }}>{stat.value}</span>
            </div>
            <div
              className="h-2 rounded-full overflow-hidden"
              style={{ backgroundColor: `${colors.border}30` }}
            >
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  backgroundColor: colors.accent,
                  width: `${stat.percentage}%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <p className="text-xs mt-3" style={{ color: colors.textMuted }}>
        Post ID: {postId}
      </p>
    </div>
  );
}
