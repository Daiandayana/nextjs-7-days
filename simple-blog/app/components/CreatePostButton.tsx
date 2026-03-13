"use client";

import { useState } from "react";

export default function CreatePostButton() {
  const [status, setStatus] = useState<string>("");

  const createPost = async () => {
    const response = await fetch("/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: "Sample Post",
        content: "This is a sample post created from the client.",
        author: "John Doe",
      }),
    });

    if (response.ok) {
      const data = await response.json();
      setStatus(`Post created! ID: ${data._id}`);
    } else {
      setStatus("Failed to create post");
    }
  };

  return (
    <div>
      <button
        onClick={createPost}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg"
      >
        Create Post
      </button>

      {status && <p className="mt-2">{status}</p>}
    </div>
  );
}
