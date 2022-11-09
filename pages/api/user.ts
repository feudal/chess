import { nanoid } from "nanoid";
import { NextApiRequest, NextApiResponse } from "next";

import { User } from "../../models";
import { db } from "../../utils";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const name = "user-" + nanoid(5);

    await db.connect();

    const user = await User.create({ name });
    await db.disconnect();
    res.status(201).json(user);
  }

  if (req.method === "POST") {
    const { name, newName } = req.body;
    await db.connect();

    const user = await User.findOne({ name: newName });
    if (user) {
      await db.disconnect();
      return res.status(400).json({ message: "This name already exists" });
    } else {
      const user = await User.findOne({ name });
      if (!user) {
        await db.disconnect();
        return res.status(400).json({ message: "User not found" });
      }
      user.name = newName;
      await user.save();
      await db.disconnect();
      res.status(200).json(user);
    }
  }
};

export default handler;
