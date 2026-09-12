import { NextResponse } from "next/server";

export const config = {
  matcher: "/",
};

export default function middleware(request) {

  if (process.env.MAINTENANCE_MODE === "true") {

    const url = request.nextUrl.clone();
    url.pathname = "/maintenance.html";

    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}
