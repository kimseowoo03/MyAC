import { NextApiRequest, NextApiResponse } from "next";
import connectMongo from "../../../db/connectMongo";
import { getUser } from "../../../db/userController";
import { IUser } from "../../../model/user";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  try {
    await connectMongo();

    const { method } = req;
    if (method === "POST") {
      const result = await getUser(req.body as IUser);
      console.log(result);
      if (!result || !result.loginSuccess) {
        res.status(500).json({ message: result?.message });
      } else if (result.code == 200 && result.cookie) {
          res.setHeader("Set-Cookie", result.cookie);
          res.json({ message: "Logged in successfully" });
      } else {
        res.status(result.code!).json({ error: result.message });
      }
    } else {
      res.status(405).end(`Method ${method} Not Allowd`);
    }
  } catch (error) {
    res.status(405).json({ error: "Error in the Connection" });
  }
}
