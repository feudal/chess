import type { NextApiRequest, NextApiResponse } from "next";

import { Room } from "../../../models";
import { db } from "../../../utils";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    await db.connect();
    const [first, second] = String(req.query.roomName)?.split("-");
    let room = await Room.findOne({ name: `${second}-${first}` });

    if (!room) {
      room = await Room.findOne({ name: String(req.query.roomName) });
    }
    await room?.populate({ path: "messages", populate: { path: "user" } });

    if (!room) {
      room = await Room.create({
        name: req.query.roomName,
        messages: [],
      });
    }

    await db.disconnect();
    res.status(200).json(room);
  } else {
    res.status(400).json({ message: "Bad request" });
  }
};

export default handler;
