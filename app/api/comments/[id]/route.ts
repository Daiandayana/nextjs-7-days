import { connectToDatabase } from "@/app/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

const collectionName = process.env.COMMENTS_COLLECTION as string || "comments";

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
    return NextResponse.json({ error: "Comment not found" }, { status: 404 });
  }

  return NextResponse.json({ message: "Comment deleted successfully" });
}
