import { NextApiRequest, NextApiResponse } from "next";
import { Game } from "../../../models";
import { db } from "../../../utils";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    if (!req.query.id) {
      res.status(400).json({ message: "Missing game id" });
      return;
    }
    await db.connect();
    let game = await Game.findOne({ _id: req.query.id });
    game.notation = (await game?.notation) + req.body.notation;
    await game.save();

    await db.disconnect();
    res.status(200).json(game);
  } else {
    res.status(400).json({ message: "Bad request" });
  }
};

export default handler;
