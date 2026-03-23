import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
  NEXT_PUBLIC_RAZORPAY_KEY_ID: process.env.RAZORPAY_KEY_ID,
}
  /* config options here */
};

export default nextConfig;
