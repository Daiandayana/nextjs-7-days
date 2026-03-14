"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Post } from "@/app/types/Post";

export default function DisplayPostList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Separate states: inputValue (immediate) vs searchTerm (for API)
  const [inputValue, setInputValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // Update searchTerm only after user stops typing (300ms)
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setSearchTerm(inputValue);
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [inputValue]);

  // Fetch posts when searchTerm changes
  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        const url = searchTerm
          ? `/api/posts?search=${encodeURIComponent(searchTerm)}`
          : "/api/posts";

        const res = await fetch(url);
        if (!res.ok) {
          throw new Error("Failed to fetch posts");
        }
        const data = await res.json();
        setPosts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, [searchTerm]);

  return (
    <div className="flex flex-col gap-4">
      {/* Search Input - uses inputValue, updates immediately */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search posts..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="w-full px-4 py-2 bg-[#0d1f3c] border border-cyan-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400"
        />
      </div>

      {isLoading && (
        <p className="text-center p-4 text-gray-400">Loading posts...</p>
      )}

      {error && (
        <p className="text-center p-4 text-red-400">Error: {error}</p>
      )}

      {!isLoading && posts.length === 0 && (
        <p className="text-center p-4 text-gray-400">
          {searchTerm ? "No posts match your search." : "No posts yet. Create one!"}
        </p>
      )}

      {!isLoading && posts.length > 0 && (
        <div className="flex flex-col gap-4">
          {posts.map((post) => (
            <Link
              key={post._id}
              href={`/posts/${post._id}`}
              className="block bg-[#0d1f3c] hover:bg-[#0a1628] p-4 rounded-lg border border-cyan-500/30 hover:border-cyan-400 transition-all"
            >
              <h3 className="text-lg font-semibold text-cyan-400">{post.title}</h3>
              <p className="text-sm text-gray-400 mt-1">Click to read more →</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}