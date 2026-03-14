"use client";

import { useState } from "react";

export default function CreatePostButton() {
  const [status, setStatus] = useState<string>("");

  const createPost = async () => {
    const title = prompt("Enter new title");
    const content = prompt("Enter new content");
    const author = prompt("Enter new author");

    if (title && content && author) {
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          content: content,
          author: author,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setStatus(`Post created!`);
        // Refresh to show new post
        window.location.reload();
      } else {
        setStatus("Failed to create post");
      }
    }
  };

  return (
    <div>
      <button
        onClick={createPost}
        className="w-full px-4 py-3 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold rounded-lg transition-colors"
      >
        + Create New Post
      </button>

      {status && (
        <p className="mt-3 text-green-400 text-center">{status}</p>
      )}
    </div>
  );
}
