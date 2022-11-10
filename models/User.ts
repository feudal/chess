import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    id: String,
    name: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

export const User = mongoose.models.User || mongoose.model("User", userSchema);
