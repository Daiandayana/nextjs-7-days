"use client";

import { useTheme } from "@/components/shared/ThemeProvider";
import PostActions from "./PostActions";
import CommentSection from "@/components/posts/CommentSection";
import ThemeToggleButton from "@/components/shared/ThemeToggleButton";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";

// Define the serialized post type (strings instead of ObjectId/Date)
interface SerializedPost {
  _id: string;
  title: string;
  content: string;
  author: string;
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

        {/* Comment Section */}
        <CommentSection postId={post._id} />

      </div>
    </div>
  );
}
