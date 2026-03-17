import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectDB from "@/lib/db";
import User from "@/models/User";

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

    // --- Success response (no JWT) ---
    return NextResponse.json(
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

  } catch (error) {
    console.error("[LOGIN ERROR]", error);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}