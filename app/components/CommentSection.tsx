"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import useSWR from "swr";
import { Comment } from "@/app/types/Comment";

const commentSchema = z.object({
  content: z.string().min(1, "Comment cannot be empty"),
  author: z.string().min(1, "Name is required"),
});

type CommentFormData = z.infer<typeof commentSchema>;

const fetcher = (url: string) => fetch(url).then((res) => {
  if (!res.ok) throw new Error("Failed to fetch");
  return res.json();
});

type CommentFormProps = {
  postId: string;
};

export default function CommentSection({ postId }: CommentFormProps) {
  const { data: comments, error, isLoading, mutate } = useSWR<Comment[]>(
    `/api/comments?postId=${postId}`,
    fetcher
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CommentFormData>({
    resolver: zodResolver(commentSchema),
  });

  const onSubmit = async (data: CommentFormData) => {
    // Optimistic update - add comment immediately
    const tempComment = {
      _id: "temp-" + Date.now(),
      postId,
      content: data.content,
      author: data.author,
      createdAt: new Date(),
    };

    // Add to UI immediately
    mutate([tempComment, ...(comments || [])], false);

    try {
      const response = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, postId }),
      });

      if (response.ok) {
        const newComment = await response.json();
        // Update with real data from server
        mutate();
        reset();
      } else {
        // Revert on error
        mutate();
      }
    } catch {
      // Revert on error
      mutate();
    }
  };

  const deleteComment = async (commentId: string) => {
    if (!confirm("Delete this comment?")) return;

    // Optimistic update
    const previousComments = comments;
    mutate(comments?.filter((c) => c._id !== commentId), false);

    try {
      const response = await fetch(`/api/comments/${commentId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        mutate(previousComments);
      }
    } catch {
      mutate(previousComments);
    }
  };

  return (
    <div className="mt-8 pt-6 border-t border-cyan-500/30">
      <h3 className="text-xl font-semibold text-cyan-400 mb-4">Comments</h3>

      {/* Comment Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="mb-6 space-y-3">
        <div>
          <input
            {...register("author")}
            placeholder="Your name"
            className="w-full px-4 py-2 bg-[#0d1f3c] border border-cyan-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400"
          />
          {errors.author && (
            <p className="text-red-400 text-sm mt-1">{errors.author.message}</p>
          )}
        </div>
        <div>
          <textarea
            {...register("content")}
            placeholder="Write a comment..."
            rows={3}
            className="w-full px-4 py-2 bg-[#0d1f3c] border border-cyan-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 resize-none"
          />
          {errors.content && (
            <p className="text-red-400 text-sm mt-1">{errors.content.message}</p>
          )}
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold rounded-lg transition-colors"
        >
          Add Comment
        </button>
      </form>

      {/* Comments List */}
      {isLoading && <p className="text-gray-400">Loading comments...</p>}
      
      {error && <p className="text-red-400">Failed to load comments</p>}

      {!isLoading && !error && comments?.length === 0 && (
        <p className="text-gray-400">No comments yet. Be the first!</p>
      )}

      {comments?.map((comment) => (
        <div
          key={comment._id}
          className="bg-[#0d1f3c] p-4 rounded-lg mb-3 border border-cyan-500/20"
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-cyan-400 font-semibold">{comment.author}</p>
              <p className="text-gray-300 mt-1">{comment.content}</p>
              <p className="text-gray-500 text-sm mt-2">
                {new Date(comment.createdAt).toLocaleDateString()}
              </p>
            </div>
            {!comment._id.startsWith("temp-") && (
              <button
                onClick={() => deleteComment(comment._id)}
                className="text-red-400 hover:text-red-300 text-sm"
              >
                Delete
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
