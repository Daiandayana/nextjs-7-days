import ThemeToggleButton from "@/components/shared/ThemeToggleButton";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

export default function PostDetailSkeleton() {
  return (
    <div className="min-h-screen p-8">
      {/* Theme Toggle */}
      <div className="flex justify-end mb-4">
        <div className="w-24 h-10 bg-gray-700 rounded animate-pulse"></div>
      </div>

      <div className="max-w-2xl mx-auto space-y-4">
        {/* Main Content Box */}
        <Card className="animate-pulse">
          <CardHeader className="border-b border-gray-700">
            <div className="flex justify-between">
              <div className="h-6 bg-gray-700 rounded w-24"></div>
              <div className="flex gap-2">
                <div className="h-6 bg-gray-700 rounded w-16"></div>
                <div className="h-6 bg-gray-700 rounded w-16"></div>
              </div>
            </div>
          </CardHeader>

          <CardContent className="pt-6">
            <div className="h-10 bg-gray-700 rounded w-2/3 mb-4"></div>
            <div className="h-48 bg-gray-700 rounded mb-4"></div>
            <div className="h-4 bg-gray-700 rounded w-1/3 mb-4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-700 rounded"></div>
              <div className="h-4 bg-gray-700 rounded"></div>
              <div className="h-4 bg-gray-700 rounded"></div>
              <div className="h-4 bg-gray-700 rounded w-2/3"></div>
            </div>
            <div className="h-4 bg-gray-700 rounded w-1/4 mt-6 pt-4 border-t border-gray-700"></div>
          </CardContent>
        </Card>

        {/* Post Stats Skeleton */}
        <Card className="animate-pulse">
          <CardContent className="pt-6">
            <div className="flex gap-8">
              <div className="h-4 bg-gray-700 rounded w-20"></div>
              <div className="h-4 bg-gray-700 rounded w-20"></div>
            </div>
          </CardContent>
        </Card>

        {/* Comments Skeleton */}
        <Card className="animate-pulse">
          <CardHeader className="border-b border-gray-700">
            <div className="h-6 bg-gray-700 rounded w-32"></div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4 mb-6">
              <div className="h-10 bg-gray-700 rounded"></div>
              <div className="h-20 bg-gray-700 rounded"></div>
              <div className="h-8 bg-gray-700 rounded w-24"></div>
            </div>
            <div className="space-y-3">
              <div className="h-16 bg-gray-700 rounded"></div>
              <div className="h-16 bg-gray-700 rounded"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
