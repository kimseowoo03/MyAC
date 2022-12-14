import connectMongo from "../../utils/connectMongo"

export default function handler(req, res) {
  connectMongo()
  res.status(200).json({ name: "김서우"})
}