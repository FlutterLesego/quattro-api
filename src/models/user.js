import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
    },
    mobile: {
      type: String,
    },
    password: {
      type: String,
      select: false,
    },
    avatar: {
      type: String,
    },
    otp: {
      type: String,
      select: false,
    },
    fcmToken: {
      type: String,
    },
    refreshToken: {
      type: String,
      select: false,
    },
    role: {
      type: String,
      enum: [
        "master",
        "admin",
        "driver",
        "student",
        "residential",
        "agent",
        "technician",
      ],
    },
    address: {
      type: String,
    },
  },
  { timestamps: true }
);

const User = model("User", userSchema);

export { User };
