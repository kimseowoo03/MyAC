/**Controller */
import Users from "../model/user";

export async function getUsers(req,res) {
  try {
    const users = await Users.find({})

    if(!users) return res.status(404).json({error: "Data not Found"})
    res.status(200).json({ user: "GET 요청"});
  } catch (error) {
    res.status(404).json({error: "Error While Fetching Data"})
  }
}