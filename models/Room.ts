import mongoose from "mongoose";

const RoomSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    messages: [{ type: mongoose.Schema.Types.ObjectId, ref: "Message" }],
  },
  {
    timestamps: true,
  },
);

export const Room = mongoose.models.Room || mongoose.model("Room", RoomSchema);
