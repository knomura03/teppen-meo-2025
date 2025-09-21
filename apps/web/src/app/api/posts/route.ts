import { NextResponse } from "next/server";
import { listPosts } from "@/lib/server/mock-db";

export async function GET() {
  const data = listPosts();
  return NextResponse.json({ data });
}
