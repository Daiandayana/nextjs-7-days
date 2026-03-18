"use client";

import { useTheme } from "@/components/shared/ThemeProvider";
import PostActions from "./PostActions";
import ThemeToggleButton from "@/components/shared/ThemeToggleButton";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import dynamic from "next/dynamic";
import Image from "next/image";

// Lazy load PostStats component with loading skeleton
const PostStats = dynamic(
  () => import("@/components/posts/PostStats"),
  {
    loading: () => {
      const Skeleton = require("@/components/posts/PostStatsSkeleton").default;
      return <Skeleton />;
    },
    ssr: false // Disable SSR for stats (client-only interactive component)
  }
);

// Lazy load CommentSection with loading skeleton
const CommentSection = dynamic(
  () => import("@/components/posts/CommentSection"),
  {
    loading: () => {
      const Skeleton = require("@/components/posts/CommentSkeleton").default;
      return <Skeleton />;
    }
  }
);

// Define the serialized post type (strings instead of ObjectId/Date)
interface SerializedPost {
  _id: string;
  title: string;
  content: string;
  author: string;
  image?: string;
  createdAt: string;
  updatedAt: string;
}

interface PostDetailProps {
  post: SerializedPost;
}

export default function PostDetailClient({ post }: PostDetailProps) {
  const { colors } = useTheme();

  return (
    <div className="min-h-screen p-8">
      {/* Theme Toggle */}
      <div className="flex justify-end mb-4">
        <ThemeToggleButton />
      </div>

      <div className="max-w-2xl mx-auto space-y-4">
        
        {/* Main Content Box - Using shadcn/ui Card with theme colors */}
        <Card 
          className="border"
          style={{ 
            backgroundColor: colors.card,
            borderColor: `${colors.border}50`
          }}
        >
          <CardHeader 
            className="border-b"
            style={{ borderColor: `${colors.border}50` }}
          >
            <PostActions
              post={{
                _id: post._id,
                title: post.title,
                content: post.content,
                author: post.author,
                image: post.image,
                createdAt: new Date(post.createdAt),
                updatedAt: new Date(post.updatedAt),
              }}
            />
          </CardHeader>
          
          <CardContent className="pt-6">
            <CardTitle 
              className="text-3xl font-bold mb-4"
              style={{ color: colors.accent }}
            >
              {post.title}
            </CardTitle>
            
            {post.image && (
              <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            )}
            
            <CardDescription 
              className="mb-4"
              style={{ color: colors.textMuted }}
            >
              By <span style={{ color: colors.accent, fontWeight: 600 }}>{post.author}</span>
            </CardDescription>
            
            <div className="prose prose-invert max-w-none">
              <p 
                className="text-lg leading-relaxed whitespace-pre-wrap"
                style={{ color: colors.text }}
              >
                {post.content}
              </p>
            </div>

            <div 
              className="mt-6 pt-4 border-t"
              style={{ borderColor: `${colors.border}50` }}
            >
              <p className="text-sm" style={{ color: colors.textMuted }}>
                Created: {new Date(post.createdAt).toLocaleDateString()}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Lazy-loaded Post Statistics - loads after initial page render */}
        <PostStats 
          postId={post._id} 
          viewCount={Math.floor(Math.random() * 500) + 100} 
          commentCount={0} // Will be updated via props in real implementation
        />

        {/* Comment Section */}
        <CommentSection postId={post._id} />

      </div>
    </div>
  );
}
