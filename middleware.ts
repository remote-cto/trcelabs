import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET!);

const PROTECTED = ["/dashboard"]; 
const AUTH_ROUTES = ["/login", "/register"];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("session")?.value;

  const isProtected = PROTECTED.some((p) => pathname.startsWith(p));
  const isAuthRoute = AUTH_ROUTES.some((p) => pathname.startsWith(p));

  let isValid = false;
  if (token) {
    try {
      await jwtVerify(token, SECRET);
      isValid = true;
    } catch {
      isValid = false;
    }
  }

  // Redirect unauthenticated users away from protected pages
  if (isProtected && !isValid) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Redirect already-logged-in users away from login/register
  if (isAuthRoute && isValid) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/register"],
};