import { NextResponse } from "next/server";
import {
  fetchGbpLocations,
  GbpApiError,
} from "@/lib/server/services/gbp";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const accountId =
    searchParams.get("accountId") ?? process.env.GBP_ACCOUNT_ID ?? "";

  try {
    const data = await fetchGbpLocations({ accountId });
    return NextResponse.json({ data });
  } catch (error) {
    if (error instanceof GbpApiError) {
      return NextResponse.json(
        { error: error.message },
        { status: error.status ?? 500 }
      );
    }

    return NextResponse.json(
      { error: "Unexpected error" },
      { status: 500 }
    );
  }
}
