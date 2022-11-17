import mongoose from "mongoose";

const GameSchema = new mongoose.Schema(
  {
    white: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    black: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    gamePosition: { type: String, required: true },
    winner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  },
);

export const Game = mongoose.models.Game || mongoose.model("Game", GameSchema);
