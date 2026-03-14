import { connectToDatabase } from "@/app/lib/mongodb";
import { NextResponse } from "next/server";

const collectionName = process.env.COLLECTION_NAME as string;

export async function GET(request: Request) {
  const {searchParams} = new URL(request.url);
  const search = searchParams.get("search")?.toLowerCase() || "";

  const {db} = await connectToDatabase();

  let query = {};

  if (search) {
    query = {
      title: { $regex: search, $options: "i" }
    };
  }

  const posts = await db.collection(collectionName).find(query).toArray();
  return NextResponse.json(posts);
}

export async function POST(request: Request) {
  if (!collectionName) {
    throw new Error("COLLECTION_NAME environment variable is not set");
  }

  const { db } = await connectToDatabase();
  const body = await request.json();

  if (!body.title || !body.content || !body.author) {
    return NextResponse.json(
      { error: "Title, content, and author are required" },
      { status: 400 },
    );
  }

  const newPost = {
    title: body.title,
    content: body.content,
    author: body.author,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const result = await db.collection(collectionName).insertOne(newPost);
  return NextResponse.json({ ...newPost, _id: result.insertedId });
}
