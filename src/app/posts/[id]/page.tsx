import { connectToDatabase } from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import PostDetailClient from "./PostDetailClient";
import { Post } from "@/types/Post";

const collectionName = process.env.COLLECTION_NAME as string;

// Helper to convert MongoDB document to plain object
function serializePost(post: Post) {
  return {
    _id: String(post._id),
    title: post.title,
    content: post.content,
    author: post.author,
    createdAt: post.createdAt instanceof Date 
      ? post.createdAt.toISOString() 
      : String(post.createdAt),
    updatedAt: post.updatedAt instanceof Date 
      ? post.updatedAt.toISOString() 
      : String(post.updatedAt),
  };
}

export default async function PostDetail({
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

  // Serialize the post to a plain object for Client Component
  const serializedPost = serializePost(post);

  return <PostDetailClient post={serializedPost} />;
}
