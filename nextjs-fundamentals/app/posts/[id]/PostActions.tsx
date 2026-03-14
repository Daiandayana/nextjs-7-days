"use client";

import { useRouter } from "next/navigation";

type PostData = {
  _id: string;
  title: string;
  content: string;
  author: string;
  createdAt: Date;
  updatedAt: Date;
};

export default function PostActions({ post }: { post: PostData }) {
  const router = useRouter();

  const deletePost = async () => {
    const confirmed = confirm("Are you sure you want to delete this post?");
    if (!confirmed) return;

    const response = await fetch(`/api/posts/${post._id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      router.push("/");
    }
  };

  const updatePost = async () => {
    const newTitle = prompt("Enter new title:", post.title) || post.title;
    const newContent = prompt("Enter new content:", post.content) || post.content;
    const newAuthor = prompt("Enter new author:", post.author) || post.author;

    const response = await fetch(`/api/posts/${post._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: newTitle,
        content: newContent,
        author: newAuthor,
      }),
    });

    if (response.ok) {
      router.refresh();
    }
  };

  return (
    <div className="flex items-center justify-between">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded-lg transition-colors"
      >
        ← Back
      </button>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <button
          onClick={updatePost}
          className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white font-medium rounded-lg transition-colors"
        >
          Update
        </button>
        <button
          onClick={deletePost}
          className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg transition-colors"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
