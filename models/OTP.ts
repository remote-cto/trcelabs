import mongoose, { Document, Schema } from "mongoose";

export interface IOTP extends Document {
  email: string;
  otp: string;
  expiresAt: Date;
}

const OTPSchema = new Schema<IOTP>({
  email: { type: String, required: true },
  otp: { type: String, required: true },
  expiresAt: { type: Date, required: true },
});

// Auto-delete expired OTPs via TTL index
OTPSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const OTP = mongoose.models.OTP || mongoose.model<IOTP>("OTP", OTPSchema);

export default OTP;