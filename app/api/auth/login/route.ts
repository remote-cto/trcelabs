//app/auth/login/route.ts

import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { SignJWT } from "jose";
import connectDB from "@/lib/db";
import User from "@/models/User";

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET!);

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 }
      );
    }

    // --- Find user ---
    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      return NextResponse.json({ error: "Invalid credentials." }, { status: 401 });
    }

    // --- Check if verified ---
    if (!user.isVerified) {
      return NextResponse.json(
        { error: "Account not verified. Please complete email verification first." },
        { status: 403 }
      );
    }

    // --- Compare password ---
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ error: "Invalid credentials." }, { status: 401 });
    }

    // --- Create JWT ---
    const token = await new SignJWT({
      id: user._id.toString(),
      email: user.email,
    })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("7d")
      .sign(SECRET);

    // --- Build response ---
    const res = NextResponse.json(
      {
        message: "Authentication successful.",
        user: {
          id: user._id.toString(),
          fullname: user.fullname,
          email: user.email,
        },
      },
      { status: 200 }
    );

    // --- Set HttpOnly cookie ---
    res.cookies.set("session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return res;

  } catch (error) {
    console.error("[LOGIN ERROR]", error);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}