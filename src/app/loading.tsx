export default function Loading() {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-700 rounded w-1/3 mb-8"></div>
          <div className="flex gap-8">
            <div className="w-1/3">
              <div className="bg-[#1e3a5f] p-6 rounded-lg">
                <div className="h-6 bg-gray-700 rounded w-1/2 mb-4"></div>
                <div className="h-10 bg-gray-700 rounded"></div>
              </div>
            </div>
            <div className="w-2/3">
              <div className="bg-[#1e3a5f] p-6 rounded-lg">
                <div className="h-6 bg-gray-700 rounded w-1/3 mb-4"></div>
                <div className="space-y-3">
                  <div className="h-20 bg-gray-700 rounded"></div>
                  <div className="h-20 bg-gray-700 rounded"></div>
                  <div className="h-20 bg-gray-700 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
