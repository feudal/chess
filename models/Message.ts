import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema(
  {
    id: String,
    text: { type: String, required: true },
    user_name: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

export const Message = mongoose.models.Message || mongoose.model("Message", MessageSchema);
