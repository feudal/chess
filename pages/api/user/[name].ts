import { nanoid } from "nanoid";
import { NextApiRequest, NextApiResponse } from "next";

import { User } from "../../../models";
import { db } from "../../../utils";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    await db.connect();
    // * find the user with the query name
    const user = await User.findOne({ name: req.query.name });
    await db.disconnect();
    res.status(200).json(user);

    if (!user) {
      // * if user not found, return new  user object
      const name = "user-" + nanoid(5);
      const user = await User.create({ name });
      await db.disconnect();
      res.status(201).json(user);
    }
  } else {
    res.status(400).json({ message: "Bad request" });
  }
};

export default handler;
