export const config = {
  matcher: "/((?!images|css|js|api).*)",
};

export default function middleware(request) {
  if (process.env.MAINTENANCE_MODE === "true") {
    return fetch(new URL("/maintenance.html", request.url));
  }
}
