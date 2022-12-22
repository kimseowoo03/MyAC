/**Controller */
import Users from "../model/user";

export async function getUsers(req,res) {
  try {
    const users = await Users.find({})

    if(!users) return res.status(404).json({error: "데이터를 찾을 수 없습니다."})
    res.status(200).json(users);
  } catch (error) {
    res.status(404).json(error)
  }
}

export async function postUser(req, res){
  try {
    const userData = req.body;
    if(!userData) return res.status(404).json({error: "데이터가 없습니다."});
    Users.create(userData, function(err, data){
      return res.status(200).json(data)
    })
  } catch (error) {
    res.status(404).json(error)
  }
}