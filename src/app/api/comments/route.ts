import { connectToDatabase } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { z } from "zod";

export const dynamic = "force-dynamic";

const collectionName = process.env.COMMENTS_COLLECTION as string || "comments";

const commentSchema = z.object({
  postId: z.string().min(1, "Post ID is required"),
  content: z.string().min(1, "Comment content is required"),
  author: z.string().min(1, "Author is required"),
});

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const postId = searchParams.get("postId");

  const { db } = await connectToDatabase();
  
  let query = {};
  if (postId) {
    query = { postId };
  }
  
  const comments = await db.collection(collectionName).find(query).toArray();
  return NextResponse.json(comments);
}

export async function POST(request: Request) {
  if (!collectionName) {
    throw new Error("COMMENTS_COLLECTION environment variable is not set");
  }

  const { db } = await connectToDatabase();
  
  try {
    const body = await request.json();
    const validatedData = commentSchema.parse(body);

    const newComment = {
      postId: validatedData.postId,
      content: validatedData.content,
      author: validatedData.author,
      createdAt: new Date(),
    };

    const result = await db.collection(collectionName).insertOne(newComment);
    return NextResponse.json({ ...newComment, _id: result.insertedId }, { status: 201 });
    
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
