import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  
  // Log for now - can be extended to send to analytics service
  console.log("[Vitals API]", body);
  
  return NextResponse.json({ success: true });
}
