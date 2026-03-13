import { connectToDatabase } from "@/app/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  const { db } = await connectToDatabase();
  const users = await db.collection("users").find({}).toArray();
  return NextResponse.json(users);
}

export async function POST(request: Request) {
  const { db } = await connectToDatabase();
  const data = await request.json();

  const result = await db.collection("users").insertOne(data);
  return NextResponse.json(result);
}
