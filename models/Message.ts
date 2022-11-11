import mongoose from "mongoose";
import { User } from ".";

const MessageSchema = new mongoose.Schema(
  {
    text: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  },
);

export const Message = mongoose.models.Message || mongoose.model("Message", MessageSchema);
