import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  if ((await isAuthenticated(req)) === false) {
    return new NextResponse("Unathorized", {
      status: 401,
      headers: { "www-Authenticate": "Basic" },
    });
  }
}

async function isAuthenticated(req: NextRequest) {
  const authHeader =
    req.headers.get("authorization") || req.headers.get("Authorization");

  if (authHeader == null) return false;

  const [username, password] = Buffer.from(authHeader.split(" ")[1], "base64")
    .toString()
    .split(":");
  fetch("https://dummyjson.com/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: username,
      password: password,
      expiresInMins: 30, // optional, defaults to 60
    }),
  }).then((res) => {
    if (!res) return false;
    else return true;
  });
}

export const config = {
  matcher: "/checkout",
};
