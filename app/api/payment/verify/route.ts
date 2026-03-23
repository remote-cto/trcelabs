import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import connectDB from "@/lib/db";
import User from "@/models/User";
import { jwtVerify } from "jose";

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET!);

export async function POST(req: NextRequest) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, plan } = await req.json();

    // Verify signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return NextResponse.json({ error: "Invalid payment signature." }, { status: 400 });
    }

    // Get user from session cookie
    const token = req.cookies.get("session")?.value;
    if (!token) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

    const { payload } = await jwtVerify(token, SECRET);
    await connectDB();

    await User.findByIdAndUpdate(payload.id, {
      plan,
      paymentId: razorpay_payment_id,
      orderId: razorpay_order_id,
      paidAt: new Date(),
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("[VERIFY ERROR]", error);
    return NextResponse.json({ error: "Verification failed." }, { status: 500 });
  }
}