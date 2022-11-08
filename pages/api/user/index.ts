import { NextApiRequest, NextApiResponse } from "next";

import { User } from "../../../models";
import { db } from "../../../utils";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await db.connect();

  const users = await User.find({}).lean();
  await db.disconnect();
  res.status(200).json(users);
};

export default handler;
