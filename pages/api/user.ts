import { nanoid } from "nanoid";
import { NextApiRequest, NextApiResponse } from "next";

import { User } from "../../models";
import { db } from "../../utils";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const name = "user-" + nanoid(5);

  await db.connect();

  const user = await User.create({ name });
  await db.disconnect();
  res.status(201).json(user);
};

export default handler;
