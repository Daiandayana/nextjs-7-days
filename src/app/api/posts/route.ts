import { connectToDatabase } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { z } from "zod";

const collectionName = process.env.COLLECTION_NAME as string;

const postSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  author: z.string().min(1, "Author is required"),
});

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search");

  const { db } = await connectToDatabase();

  let query = {};
  if (search) {
    query = { title: { $regex: search, $options: "i" } };
  }

  const posts = await db.collection(collectionName).find(query).toArray();
  return NextResponse.json(posts);
}

export async function POST(request: Request) {
  if (!collectionName) {
    throw new Error("COLLECTION_NAME environment variable is not set");
  }

  const { db } = await connectToDatabase();

  try {
    const body = await request.json();
    const validatedData = postSchema.parse(body);

    const newPost = {
      title: validatedData.title,
      content: validatedData.content,
      author: validatedData.author,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await db.collection(collectionName).insertOne(newPost);
    return NextResponse.json(
      { ...newPost, _id: result.insertedId },
      { status: 201 },
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 },
      );
    }
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
