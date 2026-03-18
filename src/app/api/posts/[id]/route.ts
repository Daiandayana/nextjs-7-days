import { connectToDatabase } from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";
import { z } from "zod";

const collectionName = process.env.COLLECTION_NAME as string;

const updateSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  author: z.string().min(1, "Author is required"),
  image: z.string().url("Invalid image URL").optional().or(z.literal("")),
});

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
  
  try {
    const body = await request.json();
    const validatedData = updateSchema.parse(body);

    const updatePost = {
      title: validatedData.title,
      content: validatedData.content,
      author: validatedData.author,
      image: validatedData.image || undefined,
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
