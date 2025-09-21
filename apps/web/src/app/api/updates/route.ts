import { NextResponse } from "next/server";
import { listRequests } from "@/lib/server/mock-db";

export async function GET() {
  const data = listRequests();
  return NextResponse.json({ data });
}
