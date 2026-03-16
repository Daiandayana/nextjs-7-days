"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen p-8 flex items-center justify-center">
      <div className="bg-[#1e3a5f] p-8 rounded-lg shadow-lg max-w-md w-full text-center">
        <h2 className="text-2xl font-bold text-red-400 mb-4">Something went wrong!</h2>
        <p className="text-gray-300 mb-6">
          {error.message || "An unexpected error occurred"}
        </p>
        {error.digest && (
          <p className="text-sm text-gray-500 mb-4">Error ID: {error.digest}</p>
        )}
        <button
          onClick={() => reset()}
          className="px-6 py-2 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold rounded-lg transition-colors"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
