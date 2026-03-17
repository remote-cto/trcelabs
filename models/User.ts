import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  fullname: string;
  contact: string;
  email: string;
  password: string;
  isVerified: boolean;
  createdAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    fullname: { type: String, required: true, trim: true },
    contact: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: true },
    isVerified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;