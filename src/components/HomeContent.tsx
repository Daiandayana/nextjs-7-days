"use client";

import CreatePostButton from "./CreatePostButton";
import ThemeToggleButton from "./shared/ThemeToggleButton";
import LogoutButton from "./shared/LogoutButton";
import LanguageSwitcher from "./shared/LanguageSwitcher";
import { useTheme } from "./shared/ThemeProvider";
import { useI18n } from "@/lib/i18n";
import dynamic from "next/dynamic";

// Lazy load DisplayPostList with skeleton loading
const DisplayPostList = dynamic(
  () => import("./posts/DisplayPostList"),
  {
    loading: () => {
      const Skeleton = require("./posts/PostListSkeleton").default;
      return <Skeleton />;
    }
  }
);

interface DbStatus {
  success: boolean;
  message: string;
}

export default function HomeContent({ dbStatus }: { dbStatus: DbStatus }) {
  const { colors } = useTheme();
  const { t } = useI18n();

  return (
    <div className="min-h-screen p-8">
      {/* Header with Toggle */}
      <div className="flex justify-end items-center gap-3 mb-4">
        <LanguageSwitcher />
        <LogoutButton />
        <ThemeToggleButton />
      </div>

      <h1 className="text-3xl font-bold text-center mb-8" style={{ color: colors.accent }}>
        {t("HomePage.title")}
      </h1>

      <div className="flex flex-col md:flex-row gap-8 max-w-6xl mx-auto">
        
        {/* Left Column - Database Status + Create Button */}
        <div className="w-full md:w-1/3">
          <div 
            className="p-6 rounded-lg shadow-lg"
            style={{ backgroundColor: colors.card }}
          >
            <h2 className="text-xl font-semibold mb-4" style={{ color: colors.text }}>
              Database Status
            </h2>
            <p
              className="p-2 rounded mb-4"
              style={{
                backgroundColor: dbStatus.success ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                color: dbStatus.success ? '#22c55e' : '#ef4444'
              }}
            >
              {dbStatus.message}
            </p>
            <CreatePostButton />
          </div>
        </div>

        {/* Right Column - Posts List */}
        <div className="w-full md:w-2/3">
          <div 
            className="p-6 rounded-lg shadow-lg"
            style={{ backgroundColor: colors.card }}
          >
            <h2 className="text-xl font-semibold mb-4" style={{ color: colors.text }}>
              All Posts
            </h2>
            <DisplayPostList />
          </div>
        </div>
        
      </div>
    </div>
  );
}
