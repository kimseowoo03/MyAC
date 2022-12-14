import connectMongo from "../../../db/connectMongo"
import { getUsers } from "../../../db/controller";

export default function handler(req, res) {
  connectMongo().catch(() => res.status(405).json({ error: "Error in the Connection"}))

  const { method } = req

  switch (method) {
    case "GET":
      getUsers(req, res)
      break;
    case "POST":
      res.status(200).json({ method, name: "POST Req" });
      break;
    case "PUT":
      res.status(200).json({ method, name: "PUT Req" });
      break;
    case "DELETE":
      res.status(200).json({ method, name: "DELETE Req" });
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE'])
      res.status(405).end(`Method ${method} Not Allowd`)
      break;
  }
}