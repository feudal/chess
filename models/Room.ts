import mongoose from "mongoose";

const RoomSchema = new mongoose.Schema(
  {
    id: String,
    name: { type: String, required: true },
    messages: [{ type: mongoose.Schema.Types.ObjectId, ref: "Message" }],
  },
  {
    timestamps: true,
  },
);

export const Room = mongoose.models.Room || mongoose.model("Room", RoomSchema);
