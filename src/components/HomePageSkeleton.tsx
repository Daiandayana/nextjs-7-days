import ThemeToggleButton from "./shared/ThemeToggleButton";

export default function HomePageSkeleton() {
  return (
    <div className="min-h-screen p-8">
      {/* Header with Toggle */}
      <div className="flex justify-end mb-4">
        <div className="w-24 h-10 bg-gray-700 rounded animate-pulse"></div>
      </div>

      <h1 className="text-3xl font-bold text-center mb-8 text-gray-400">
        My Blog
      </h1>

      <div className="flex flex-col md:flex-row gap-8 max-w-6xl mx-auto">
        {/* Left Column - Database Status + Create Button */}
        <div className="w-full md:w-1/3">
          <div className="bg-[#1e3a5f] p-6 rounded-lg shadow-lg animate-pulse">
            <div className="h-6 bg-gray-700 rounded w-2/3 mb-4"></div>
            <div className="h-10 bg-gray-700 rounded mb-4"></div>
            <div className="h-10 bg-gray-700 rounded"></div>
          </div>
        </div>

        {/* Right Column - Posts List */}
        <div className="w-full md:w-2/3">
          <div className="bg-[#1e3a5f] p-6 rounded-lg shadow-lg animate-pulse">
            <div className="h-6 bg-gray-700 rounded w-1/3 mb-4"></div>
            <div className="h-10 bg-gray-700 rounded w-full mb-4"></div>
            <div className="space-y-3">
              <div className="h-24 bg-gray-700 rounded"></div>
              <div className="h-24 bg-gray-700 rounded"></div>
              <div className="h-24 bg-gray-700 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
