import connectMongo from "../../../db/connectMongo";
import { getUser } from "../../../db/userController";

export default async function handler(req, res) {
  await connectMongo().catch(() =>
    res.status(405).json({ error: "Error in the Connection" })
  );

  const { method } = req;
  if (method === "POST") {
    // {email, password}
    const result = await getUser(req.body);
    // if (result.code == 200) {
    //   res.status(200).json(result.data);
    // } else {
    //   res.status(result.code).json(result.err);
    // }
  } else {
    res.status(405).end(`Method ${method} Not Allowd`);
  }
}
