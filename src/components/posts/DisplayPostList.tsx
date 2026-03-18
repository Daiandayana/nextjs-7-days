"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import useSWR from "swr";
import { Post } from "@/types/Post";
import { useTheme } from "../shared/ThemeProvider";
import PostListSkeleton from "./PostListSkeleton";

const fetcher = (url: string) =>
  fetch(url).then((res) => {
    if (!res.ok) throw new Error("Failed to fetch");
    return res.json();
  });

export default function DisplayPostList() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const { colors } = useTheme();

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 300);
    return () => clearTimeout(timer);
  }, [search]);

  const query = debouncedSearch
    ? `?search=${encodeURIComponent(debouncedSearch)}`
    : "";
  const {
    data: posts,
    error,
    isLoading,
  } = useSWR<Post[]>(`/api/posts${query}`, fetcher, {
    revalidateOnFocus: false,
  });

  return (
    <div>
      <input
        type="text"
        placeholder="Search posts..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full mb-4 px-4 py-2 rounded-lg text-white placeholder-gray-500 focus:outline-none"
        style={{
          backgroundColor: colors.bg,
          border: `1px solid ${colors.border}50`,
        }}
      />

      {isLoading && <PostListSkeleton />}
      {error && (
        <p className="text-center p-4 text-red-400">Error: {error.message}</p>
      )}
      {!isLoading && !error && (!posts || posts.length === 0) && (
        <p className="text-center p-4" style={{ color: colors.textMuted }}>
          {debouncedSearch
            ? "No posts found matching your search."
            : "No posts yet. Create one!"}
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {posts?.map((post) => (
          <Link
            key={post._id}
            href={`/posts/${post._id}`}
            className="block p-4 rounded-lg border transition-all"
            style={{
              backgroundColor: colors.card,
              borderColor: `${colors.border}50`,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = colors.border;
              e.currentTarget.style.backgroundColor = colors.bg;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = `${colors.border}50`;
              e.currentTarget.style.backgroundColor = colors.card;
            }}
          >
            {post.image && (
              <div className="relative w-full h-32 mb-3 rounded-lg overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            )}
            <h3
              className="text-lg font-semibold"
              style={{ color: colors.accent }}
            >
              {post.title}
            </h3>
            <p className="text-sm mt-1" style={{ color: colors.textMuted }}>
              By {post.author}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
