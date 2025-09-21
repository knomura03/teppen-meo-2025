import { NextResponse } from "next/server";

export async function GET() {
  // TODO: Replace with real session lookup once auth providerが決定したタイミングで実装。
  return NextResponse.json({
    user: {
      id: "mock-user",
      name: "HQ Admin",
      roles: ["hq_admin"],
    },
    authenticated: false,
  });
}
