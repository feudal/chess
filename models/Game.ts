import mongoose from "mongoose";

const GameSchema = new mongoose.Schema(
  {
    white: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    black: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    notation: { type: String, required: true },
    winner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    status: { type: String, required: true },
    isWhiteTurn: { type: Boolean, required: true },
    isCheck: { type: Boolean, required: true },
  },
  {
    timestamps: true,
  },
);

export const Game = mongoose.models.Game || mongoose.model("Game", GameSchema);
