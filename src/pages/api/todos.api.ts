// get return some mock todos:

import { NextApiRequest, NextApiResponse } from "next"

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json([
    { id: 1, title: "Todo 1" },
    { id: 2, title: "Todo 2" },
    { id: 3, title: "Todo 3" },
  ])
}
