import { NextApiRequest, NextApiResponse } from "next";

import { User } from "../../models";
import { db } from "../../utils";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    await db.connect();

    const users = await User.find({}).lean();
    await db.disconnect();
    res.status(200).json(users);
  } else {
    res.status(400).json({ message: "Bad request" });
  }
};

export default handler;
