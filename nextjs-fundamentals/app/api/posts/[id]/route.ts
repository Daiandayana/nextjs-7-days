import { connectToDatabase } from "@/app/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

const collectionName = process.env.COLLECTION_NAME as string;

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const { db } = await connectToDatabase();

  const post = await db
    .collection(collectionName)
    .findOne({ _id: new ObjectId(id) });

  if (!post) {
    return NextResponse.json({ message: "Post not found" }, { status: 404 });
  }

  return NextResponse.json(post);
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const { db } = await connectToDatabase();
  const body = await request.json();

  const updatePost = {
    title: body.title,
    content: body.content,
    author: body.author,
    updatedAt: new Date(),
  };

  const result = await db
    .collection(collectionName)
    .findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: updatePost },
      { returnDocument: "after" },
    );
  if (!result) {
    return NextResponse.json({ message: "Post not found" }, { status: 404 });
  }

  return NextResponse.json(result);
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const { db } = await connectToDatabase();

  const result = await db
    .collection(collectionName)
    .deleteOne({ _id: new ObjectId(id) });

  if (result.deletedCount === 0) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  return NextResponse.json({ message: "Post deleted successfully" });
}
