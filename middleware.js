export const config = {
  matcher: "/",
};

export default function middleware(request) {

  if (process.env.MAINTENANCE_MODE === "true") {

    return Response.rewrite(
      new URL("/maintenance.html", request.url)
    );

  }

}
