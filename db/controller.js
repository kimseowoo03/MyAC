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
    const user = new Users(req.body);
    if(!user) return res.status(404).json({error: "데이터가 없습니다."});
    
    user.save((err, result) => {
      if(err) return res.status(404).json({err})
      return res.status(200).json(result)
    })
  } catch (error) {
    res.status(404).json(error)
  }
}