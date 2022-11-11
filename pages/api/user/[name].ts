import { NextApiRequest, NextApiResponse } from "next";

import { User } from "../../../models";
import { db } from "../../../utils";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    await db.connect();
    // find the user with the query name
    const user = await User.findOne({ name: req.query.name });
    if (!user) {
      await db.disconnect();
      return res.status(400).json({ message: "User not found" });
    }
    await db.disconnect();
    res.status(200).json(user);
  } else {
    res.status(400).json({ message: "Bad request" });
  }
};

export default handler;
