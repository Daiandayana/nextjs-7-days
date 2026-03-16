"use client";

import CreatePostButton from "./CreatePostButton";
import DisplayPostList from "./posts/DisplayPostList";
import ThemeToggleButton from "./shared/ThemeToggleButton";
import { useTheme } from "./shared/ThemeProvider";

interface DbStatus {
  success: boolean;
  message: string;
}

export default function HomeContent({ dbStatus }: { dbStatus: DbStatus }) {
  const { colors } = useTheme();

  return (
    <div className="min-h-screen p-8">
      {/* Header with Toggle */}
      <div className="flex justify-end mb-4">
        <ThemeToggleButton />
      </div>

      <h1 className="text-3xl font-bold text-center mb-8" style={{ color: colors.accent }}>
        My Blog
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
