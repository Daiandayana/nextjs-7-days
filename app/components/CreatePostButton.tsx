"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const postSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  author: z.string().min(1, "Author is required"),
});

type PostFormData = z.infer<typeof postSchema>;

export default function CreatePostButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
  });

  const onSubmit = async (data: PostFormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setStatus("Post created successfully!");
        reset();
        setIsOpen(false);
        window.location.reload();
      } else {
        const result = await response.json();
        setStatus(result.error || "Failed to create post");
      }
    } catch {
      setStatus("Failed to create post");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="w-full px-4 py-3 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold rounded-lg transition-colors"
      >
        + Create New Post
      </button>
    );
  }

  return (
    <div className="space-y-4">
      <button
        onClick={() => setIsOpen(true)}
        className="w-full px-4 py-3 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold rounded-lg transition-colors"
      >
        + Create New Post
      </button>

      <div className="bg-[#0d1f3c] p-4 rounded-lg border border-cyan-500/30">
        <h3 className="text-lg font-semibold text-cyan-400 mb-4">Create New Post</h3>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <div>
            <input
              {...register("title")}
              placeholder="Title"
              className="w-full px-3 py-2 bg-[#1e3a5f] border border-gray-600 rounded text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400"
            />
            {errors.title && (
              <p className="text-red-400 text-sm mt-1">{errors.title.message}</p>
            )}
          </div>

          <div>
            <textarea
              {...register("content")}
              placeholder="Content"
              rows={4}
              className="w-full px-3 py-2 bg-[#1e3a5f] border border-gray-600 rounded text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 resize-none"
            />
            {errors.content && (
              <p className="text-red-400 text-sm mt-1">{errors.content.message}</p>
            )}
          </div>

          <div>
            <input
              {...register("author")}
              placeholder="Author"
              className="w-full px-3 py-2 bg-[#1e3a5f] border border-gray-600 rounded text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400"
            />
            {errors.author && (
              <p className="text-red-400 text-sm mt-1">{errors.author.message}</p>
            )}
          </div>

          <div className="flex gap-2 pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold rounded-lg transition-colors disabled:opacity-50"
            >
              {isSubmitting ? "Creating..." : "Create"}
            </button>
            <button
              type="button"
              onClick={() => {
                setIsOpen(false);
                reset();
                setStatus("");
              }}
              className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded-lg transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>

        {status && (
          <p className={`mt-3 text-center ${status.includes("success") ? "text-green-400" : "text-red-400"}`}>
            {status}
          </p>
        )}
      </div>
    </div>
  );
}
