import { connectToDatabase } from "@/app/lib/mongodb";
import { ObjectId } from "mongodb";
import PostActions from "./PostActions";
import CommentSection from "@/app/components/CommentSection";
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

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-2xl mx-auto">
        
        {/* Main Content Box */}
        <div className="bg-[#1e3a5f] rounded-lg shadow-lg overflow-hidden">
          
          {/* Header with Back Button */}
          <div className="p-4 border-b border-cyan-500/30">
            <PostActions
              post={{
                _id: post._id.toString(),
                title: post.title,
                content: post.content,
                author: post.author,
                createdAt: post.createdAt,
                updatedAt: post.updatedAt,
              }}
            />
          </div>

          {/* Post Content */}
          <div className="p-6">
            <h1 className="text-3xl font-bold text-cyan-400 mb-4">
              {post.title}
            </h1>
            
            <div className="prose prose-invert max-w-none">
              <p className="text-lg text-gray-200 leading-relaxed whitespace-pre-wrap">
                {post.content}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-cyan-500/30">
              <p className="text-gray-400">
                By <span className="text-cyan-400 font-semibold">{post.author}</span>
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Created: {new Date(post.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
          
        </div>

        {/* Comment Section */}
        <CommentSection postId={post._id.toString()} />

      </div>
    </div>
  );
}
