import { NextResponse } from "next/server";

export function middleware() {
  // TODO: Implement auth/sessionチェック。現状は全リクエストを許可。
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard", "/reviews/:path*", "/updates/:path*", "/posts/:path*", "/reports/:path*", "/settings/:path*"],
};
