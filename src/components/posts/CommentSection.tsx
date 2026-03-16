"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import useSWR from "swr";
import { Comment } from "@/types/Comment";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useTheme } from "../shared/ThemeProvider";

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
  const { colors } = useTheme();
  
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
    const tempComment = {
      _id: "temp-" + Date.now(),
      postId,
      content: data.content,
      author: data.author,
      createdAt: new Date(),
    };

    mutate([tempComment, ...(comments || [])], false);

    try {
      const response = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, postId }),
      });

      if (response.ok) {
        mutate();
        reset();
      } else {
        mutate();
      }
    } catch {
      mutate();
    }
  };

  const deleteComment = async (commentId: string) => {
    if (!confirm("Delete this comment?")) return;

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
    <Card 
      className="mt-6"
      style={{ 
        backgroundColor: colors.card,
        borderColor: `${colors.border}50`
      }}
    >
      <CardHeader 
        className="border-b"
        style={{ borderColor: `${colors.border}50` }}
      >
        <CardTitle style={{ color: colors.accent }}>Comments</CardTitle>
      </CardHeader>
      
      <CardContent className="pt-6">
        {/* Comment Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mb-6">
          <div>
            <input
              {...register("author")}
              placeholder="Your name"
              className="w-full px-4 py-2 rounded-lg border text-white placeholder-gray-500 focus:outline-none"
              style={{
                backgroundColor: colors.bg,
                borderColor: `${colors.border}50`,
              }}
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
              className="w-full px-3 py-2 rounded-lg border text-white placeholder-gray-500 focus:outline-none resize-none"
              style={{
                backgroundColor: colors.bg,
                borderColor: `${colors.border}50`,
              }}
            />
            {errors.content && (
              <p className="text-red-400 text-sm mt-1">{errors.content.message}</p>
            )}
          </div>
          <Button 
            type="submit" 
            style={{ 
              backgroundColor: colors.accent,
              color: colors.bg
            }}
          >
            Add Comment
          </Button>
        </form>

        {/* Comments List */}
        {isLoading && <p style={{ color: colors.textMuted }}>Loading comments...</p>}
        {error && <p className="text-red-400">Failed to load comments</p>}
        {!isLoading && !error && comments?.length === 0 && (
          <p style={{ color: colors.textMuted }}>No comments yet. Be the first!</p>
        )}

        {comments?.map((comment) => (
          <div
            key={comment._id}
            className="p-4 rounded-lg mb-3 border"
            style={{
              backgroundColor: colors.bg,
              borderColor: `${colors.border}30`,
            }}
          >
            <div className="flex justify-between items-start">
              <div>
                <p style={{ color: colors.accent, fontWeight: 600 }}>{comment.author}</p>
                <p style={{ color: colors.text }} className="mt-1">{comment.content}</p>
                <p style={{ color: colors.textMuted }} className="text-sm mt-2">
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
      </CardContent>
    </Card>
  );
}
