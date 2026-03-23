// models/User.ts
import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  fullname: string;
  email: string;
  organisation: string;
  role: string;
  password: string;
  isVerified: boolean;
  createdAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    fullname:     { type: String, required: true, trim: true },
    email:        { type: String, required: true, unique: true, lowercase: true, trim: true },
    organisation: { type: String, required: true, trim: true },
    role:         { type: String, required: true, trim: true },
    password:     { type: String, required: true },
    isVerified:   { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model<IUser>("User", UserSchema);