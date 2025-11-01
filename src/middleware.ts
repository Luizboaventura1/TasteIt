import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === "/recipe") {
    // Redirect home if the route doesn't have an id
    return NextResponse.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: "/recipe/:path*",
};