import connectMongo from "../../../db/connectMongo";
import { getUser } from "../../../db/userController";

export default async function (req, res) {
  await connectMongo().catch(() =>
    res.status(405).json({ error: "Error in the Connection" })
  );

  const { method } = req;
  if (method === "POST") {

   // get user returns {code : 404 | 500 | 200, data: cookie}
    const result = await getUser(req.body);

    if (result.code == 200) {
      res.setHeader("Set-Cookie", result.cookie);
      res.json({ message: "Logged in successfully" });
    } else {
      res.status(result.code).json(result.err);
    }
  } else {
    res.status(405).end(`Method ${method} Not Allowd`);
  }
}
