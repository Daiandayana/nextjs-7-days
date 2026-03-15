"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import useSWR from "swr";
import { Post } from "@/app/types/Post";

const fetcher = (url: string) => fetch(url).then((res) => {
  if (!res.ok) throw new Error("Failed to fetch");
  return res.json();
});

export default function DisplayPostList() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 300);
    return () => clearTimeout(timer);
  }, [search]);

  // SWR handles: loading, error, data, re-fetching automatically
  const query = debouncedSearch ? `?search=${encodeURIComponent(debouncedSearch)}` : "";
  const { data: posts, error, isLoading } = useSWR<Post[]>(
    `/api/posts${query}`, 
    fetcher,
    { revalidateOnFocus: false }
  );

  // Always render search input first
  const renderSearchInput = () => (
    <input
      type="text"
      placeholder="Search posts..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="w-full mb-4 px-4 py-2 bg-[#0d1f3c] border border-cyan-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400"
    />
  );

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4">
        {renderSearchInput()}
        <p className="text-center p-4 text-gray-400">Loading posts...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col gap-4">
        {renderSearchInput()}
        <p className="text-center p-4 text-red-400">Error: {error.message}</p>
      </div>
    );
  }

  if (!posts || posts.length === 0) {
    return (
      <div className="flex flex-col gap-4">
        {renderSearchInput()}
        <p className="text-center p-4 text-gray-400">
          {debouncedSearch ? "No posts found matching your search." : "No posts yet. Create one!"}
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {renderSearchInput()}

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
  );
}
