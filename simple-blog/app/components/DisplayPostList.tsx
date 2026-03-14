"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Post } from "@/app/types/Post";

export default function DisplayPostList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/posts")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then(setPosts)
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return <p className="text-center p-4 text-gray-400">Loading posts...</p>;
  }

  if (error) {
    return <p className="text-center p-4 text-red-400">Error: {error}</p>;
  }

  if (posts.length === 0) {
    return <p className="text-center p-4 text-gray-400">No posts yet. Create one!</p>;
  }

  return (
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
  );
}
