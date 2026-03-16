import { connectToDatabase } from "@/app/lib/mongodb";
import { ObjectId } from "mongodb";
import PostDetailClient from "./PostDetailClient";
import { Post } from "@/app/types/Post";

const collectionName = process.env.COLLECTION_NAME as string;

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

  return <PostDetailClient post={post} />;
}
