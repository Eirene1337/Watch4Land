export const config = {
  matcher: "/",
};

export default function middleware(request) {
  if (process.env.MAINTENANCE_MODE === "true") {
    return new Response(null, {
      status: 307,
      headers: {
        Location: "/maintenance.html",
      },
    });
  }

  return;
}
