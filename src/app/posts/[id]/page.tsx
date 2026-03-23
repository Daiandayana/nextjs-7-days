import { connectToDatabase } from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import PostDetailClient from "./PostDetailClient";
import { Post } from "@/types/Post";
import { Suspense } from "react";
import PostDetailSkeleton from "./PostDetailSkeleton";

const collectionName = process.env.COLLECTION_NAME as string;

export const revalidate = 30;

// Helper to convert MongoDB document to plain object
function serializePost(post: Post) {
  return {
    _id: String(post._id),
    title: post.title,
    content: post.content,
    author: post.author,
    image: post.image || undefined,
    createdAt:
      post.createdAt instanceof Date
        ? post.createdAt.toISOString()
        : String(post.createdAt),
    updatedAt:
      post.updatedAt instanceof Date
        ? post.updatedAt.toISOString()
        : String(post.updatedAt),
  };
}

async function PostContent({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { db } = await connectToDatabase();
  const post = (await db
    .collection(collectionName)
    .findOne({ _id: new ObjectId(id) })) as unknown as Post;

  if (!post) return <div className="text-center p-8">Post not found</div>;

  const serializedPost = serializePost(post);
  return <PostDetailClient post={serializedPost} />;
}

export default async function PostDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <Suspense fallback={<PostDetailSkeleton />}>
      <PostContent params={params} />
    </Suspense>
  );
}
