export const config = {
  matcher: "/((?!maintenance.html|images|css|js|api).*)",
};

export default function middleware(request) {
  if (process.env.MAINTENANCE_MODE === "true") {
    return Response.redirect(
      new URL("/maintenance.html", request.url),
      307
    );
  }
}