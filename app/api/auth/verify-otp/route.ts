import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import User from "@/models/User";
import OTP from "@/models/OTP";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();
    const { email, otp } = body;

    if (!email || !otp) {
      return NextResponse.json({ error: "Email and OTP are required." }, { status: 400 });
    }

    // --- Find OTP record ---
    const otpRecord = await OTP.findOne({ email });

    if (!otpRecord) {
      return NextResponse.json({ error: "OTP not found or expired. Please register again." }, { status: 404 });
    }

    // --- Check expiry ---
    if (otpRecord.expiresAt < new Date()) {
      await OTP.deleteOne({ email });
      return NextResponse.json({ error: "OTP has expired. Please register again." }, { status: 410 });
    }

    // --- Verify OTP ---
    if (otpRecord.otp !== otp.trim()) {
      return NextResponse.json({ error: "Invalid OTP. Please try again." }, { status: 400 });
    }

    // --- Mark user as verified ---
    await User.findOneAndUpdate({ email }, { isVerified: true });

    // --- Delete used OTP ---
    await OTP.deleteOne({ email });

    return NextResponse.json(
      { message: "Registration successful! Welcome to TRCELABS." },
      { status: 200 }
    );
  } catch (error) {
    console.error("[VERIFY OTP ERROR]", error);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}