import { NextResponse } from "next/server";
import { filterReviews } from "@/lib/server/mock-db";
import type { ReviewStatus } from "@/lib/data/reviews";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const rawStatus = searchParams.get("status");
  const allowed: ReviewStatus[] = [
    "pending",
    "in_progress",
    "completed",
    "escalated",
  ];
  const status = allowed.includes(rawStatus as ReviewStatus)
    ? (rawStatus as ReviewStatus)
    : undefined;

  const data = filterReviews(status);

  return NextResponse.json({ data });
}
