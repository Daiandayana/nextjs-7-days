"use client";

import { useState } from "react";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useI18n } from "@/lib/i18n";

const postSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  author: z.string().min(1, "Author is required"),
  image: z.string().url("Invalid image URL").optional().or(z.literal("")),
});

type PostFormData = z.infer<typeof postSchema>;

export default function CreatePostButton() {
  const { data: session, status: authStatus } = useSession();
  const router = useRouter();
  const { t } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const [formStatus, setFormStatus] = useState("");
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
        setFormStatus("Post created successfully!");
        reset();
        setIsOpen(false);
        router.refresh();
      } else if (response.status === 401) {
        // Not authenticated, redirect to login
        signIn();
      } else {
        const result = await response.json();
        setFormStatus(result.error || "Failed to create post");
      }
    } catch {
      setFormStatus("Failed to create post");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Show loading state
  if (authStatus === "loading") {
    return (
      <button
        disabled
        className="w-full px-4 py-3 bg-gray-500 text-white font-semibold rounded-lg cursor-not-allowed"
      >
        {t("Common.loading")}
      </button>
    );
  }

  // Not logged in - show login button
  if (!session) {
    return (
      <button
        onClick={() => signIn()}
        className="w-full px-4 py-3 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold rounded-lg transition-colors"
      >
        {t("Post.loginToCreate")}
      </button>
    );
  }

  // Logged in - show create button or form
  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="w-full px-4 py-3 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold rounded-lg transition-colors"
      >
        {t("Post.create")}
      </button>
    );
  }

  return (
    <div className="space-y-4">
      <button
        onClick={() => setIsOpen(true)}
        className="w-full px-4 py-3 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold rounded-lg transition-colors"
      >
        {t("Post.create")}
      </button>

      <div className="bg-[#0d1f3c] p-4 rounded-lg border border-cyan-500/30">
        <h3 className="text-lg font-semibold text-cyan-400 mb-4">{t("Post.create")}</h3>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <div>
            <input
              {...register("title")}
              placeholder={t("Post.title")}
              className="w-full px-3 py-2 bg-[#1e3a5f] border border-gray-600 rounded text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400"
            />
            {errors.title && (
              <p className="text-red-400 text-sm mt-1">{errors.title.message}</p>
            )}
          </div>

          <div>
            <textarea
              {...register("content")}
              placeholder={t("Post.content")}
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
              placeholder={t("Post.author")}
              className="w-full px-3 py-2 bg-[#1e3a5f] border border-gray-600 rounded text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400"
            />
            {errors.author && (
              <p className="text-red-400 text-sm mt-1">{errors.author.message}</p>
            )}
          </div>

          <div>
            <input
              {...register("image")}
              type="url"
              placeholder={t("Post.imageUrl")}
              className="w-full px-3 py-2 bg-[#1e3a5f] border border-gray-600 rounded text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400"
            />
            {errors.image && (
              <p className="text-red-400 text-sm mt-1">{errors.image.message}</p>
            )}
          </div>

          <div className="flex gap-2 pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold rounded-lg transition-colors disabled:opacity-50"
            >
              {isSubmitting ? t("Common.loading") : t("Post.create")}
            </button>
            <button
              type="button"
              onClick={() => {
                setIsOpen(false);
                reset();
                setFormStatus("");
              }}
              className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded-lg transition-colors"
            >
              {t("Post.cancel")}
            </button>
          </div>
        </form>

        {formStatus && (
          <p className={`mt-3 text-center ${formStatus.includes("success") ? "text-green-400" : "text-red-400"}`}>
            {formStatus}
          </p>
        )}
      </div>
    </div>
  );
}
