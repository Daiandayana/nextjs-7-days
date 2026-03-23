"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import BackButton from "@/components/shared/BackButton";
import UpdateButton from "@/components/shared/UpdateButton";
import DeleteButton from "@/components/shared/DeleteButton";

const updateSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  author: z.string().min(1, "Author is required"),
  image: z.string().url("Invalid image URL").optional().or(z.literal("")),
});

type UpdateFormData = z.infer<typeof updateSchema>;

type PostData = {
  _id: string;
  title: string;
  content: string;
  author: string;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
};

export default function PostActions({ post }: { post: PostData }) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdateFormData>({
    resolver: zodResolver(updateSchema),
    defaultValues: {
      title: post.title,
      content: post.content,
      author: post.author,
      image: post.image || "",
    },
  });

  const deletePost = async () => {
    const confirmed = confirm("Are you sure you want to delete this post?");
    if (!confirmed) return;

    setIsDeleting(true);
    try {
      const response = await fetch(`/api/posts/${post._id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        router.push("/");
      }
    } finally {
      setIsDeleting(false);
    }
  };

  const onSubmit = async (data: UpdateFormData) => {
    try {
      const response = await fetch(`/api/posts/${post._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setIsEditing(false);
        router.refresh();
      }
    } catch (error) {
      console.error("Failed to update:", error);
    }
  };

  if (isEditing) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <BackButton onClick={() => router.back()} />
          <span className="text-cyan-400 font-semibold">Edit Mode</span>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <div>
            <label className="block text-gray-400 text-sm mb-1">Title</label>
            <input
              {...register("title")}
              className="w-full px-3 py-2 bg-[#1e3a5f] border border-gray-600 rounded text-white focus:outline-none focus:border-cyan-400"
            />
            {errors.title && (
              <p className="text-red-400 text-sm mt-1">{errors.title.message}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-400 text-sm mb-1">Content</label>
            <textarea
              {...register("content")}
              rows={6}
              className="w-full px-3 py-2 bg-[#1e3a5f] border border-gray-600 rounded text-white focus:outline-none focus:border-cyan-400 resize-none"
            />
            {errors.content && (
              <p className="text-red-400 text-sm mt-1">{errors.content.message}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-400 text-sm mb-1">Author</label>
            <input
              {...register("author")}
              className="w-full px-3 py-2 bg-[#1e3a5f] border border-gray-600 rounded text-white focus:outline-none focus:border-cyan-400"
            />
            {errors.author && (
              <p className="text-red-400 text-sm mt-1">{errors.author.message}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-400 text-sm mb-1">Image URL</label>
            <input
              {...register("image")}
              type="url"
              placeholder="https://example.com/image.jpg"
              className="w-full px-3 py-2 bg-[#1e3a5f] border border-gray-600 rounded text-white focus:outline-none focus:border-cyan-400"
            />
            {errors.image && (
              <p className="text-red-400 text-sm mt-1">{errors.image.message}</p>
            )}
          </div>

          <div className="flex gap-2 pt-2">
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition-colors"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={() => {
                setIsEditing(false);
                reset();
              }}
              className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded-lg transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between">
      <BackButton onClick={() => router.back()} />

      <div className="flex gap-3">
        <UpdateButton onClick={() => setIsEditing(true)} />
        <DeleteButton onClick={deletePost} disabled={isDeleting} />
      </div>
    </div>
  );
}
