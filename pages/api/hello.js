import connectMongo from "../../db/connectMongo"

export default function handler(req, res) {
  connectMongo()
  res.status(200).json({ name: "김서우"})
}