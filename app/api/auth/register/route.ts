// app/api/auth/register/route.ts
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectDB from "@/lib/db";
import User from "@/models/User";
import OTP from "@/models/OTP";
import { sendOTPEmail } from "@/lib/mailer";

function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();
    const { fullname, email, organisation, role, password, confirmPassword } = body;

    // --- Validation ---
    if (!fullname || !email || !organisation || !role || !password || !confirmPassword) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }

    if (password !== confirmPassword) {
      return NextResponse.json({ error: "Passwords do not match." }, { status: 400 });
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters." },
        { status: 400 }
      );
    }

    // --- Check if email already verified ---
    const existingUser = await User.findOne({ email });
    if (existingUser?.isVerified) {
      return NextResponse.json(
        { error: "Email is already registered." },
        { status: 409 }
      );
    }

    // --- Hash password ---
    const hashedPassword = await bcrypt.hash(password, 12);

    // --- Upsert unverified user ---
    await User.findOneAndUpdate(
      { email },
      { fullname, email, organisation, role, password: hashedPassword, isVerified: false },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    // --- Generate & save OTP ---
    const otp = generateOTP();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 min

    await OTP.findOneAndUpdate(
      { email },
      { email, otp, expiresAt },
      { upsert: true, new: true }
    );

    // --- Send OTP ---
    await sendOTPEmail(email, otp, fullname);

    return NextResponse.json(
      { message: "OTP sent to your email. Please verify to complete registration." },
      { status: 200 }
    );
  } catch (error) {
    console.error("[REGISTER ERROR]", error);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}