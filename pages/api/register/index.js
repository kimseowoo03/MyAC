import connectMongo from "../../../db/connectMongo";
import { postUser } from "../../../db/userController";

export default async function handler(req, res) {
  await connectMongo().catch(() =>
    res.status(405).json({ error: "Error in the Connection" })
  );

  const { method } = req;
  if (method === "POST") {
    const data = req.body; // TODO: Input field

    // post user returns {code : 404 | 500 | 200, data: User}
    const result = await postUser(data);

    if (result.code == 200) {
      res.status(200).json(result.data);
    } else {
      res.status(result.code).json(result.err);
    }
  } else {
    res.status(405).end(`Method ${method} Not Allowd`);
  }
}
