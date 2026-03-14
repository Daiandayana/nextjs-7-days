'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen p-8 flex items-center justify-center">
      <div className="text-center bg-[#1e3a5f] p-8 rounded-lg">
        <h2 className="text-red-400 text-xl mb-4">Something went wrong!</h2>
        <p className="text-gray-400 mb-4">{error.message}</p>
        <button
          onClick={() => reset()}
          className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg"
        >
          Try again
        </button>
      </div>
    </div>
  );
}