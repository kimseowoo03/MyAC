import { NextApiRequest, NextApiResponse } from "next";
import connectMongo from "../../../db/connectMongo";
import { postUser } from "../../../db/userController";
import { IUser } from "../../../model/user";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  try{
  await connectMongo().catch(() =>
    res.status(405).json({ error: "Error in the Connection" })
  );
  
  const { method } = req;
  if (method === "POST") {
    const data: IUser = req.body; // TODO: Input field

    const result = await postUser(data);

    if(!result) {
      res.status(500).json({ message: 'undefind error' });
    }else if (result.code == 200) {
      res.status(200).json(result.data);
    } else {
      res.status(result.code!).json(result.message);
    }
  } else {
    res.status(405).end(`Method ${method} Not Allowd`);
  }
}catch(error) {
  res.status(405).json({ error: "Error in the Connection" });
}
}
