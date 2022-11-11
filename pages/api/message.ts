import { NextApiRequest, NextApiResponse } from "next";
import { Message, Room } from "../../models";
import { db } from "../../utils";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    await db.connect();

    const message = await Message.create({
      room: req.body.room,
      user: req.body.user._id,
      text: req.body.text,
    });

    const room = await Room.findById(req.body.room);
    room.messages.push(message);
    await room.save();

    await db.disconnect();
    res.status(200).json(message);
  } else {
    res.status(400).json({ message: "Bad request" });
  }
};

export default handler;
