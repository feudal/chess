import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema(
  {
    id: String,
    time: { type: String, required: true },
    text: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    room: { type: mongoose.Schema.Types.ObjectId, ref: "Room" },
  },
  {
    timestamps: true,
  },
);

export const Message = mongoose.models.Message || mongoose.model("Message", MessageSchema);
