import { NextResponse } from "next/server";
import { KPI_SUMMARY, LOCATION_METRICS } from "@/lib/data/analytics";

export async function GET() {
  return NextResponse.json({ summary: KPI_SUMMARY, locations: LOCATION_METRICS });
}
