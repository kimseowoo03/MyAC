/**userController */
import Users from "../model/user";

export async function getUsers(req, res) {
  try {
    const users = await Users.find({});

    if (!users)
      return res.status(404).json({ error: "데이터를 찾을 수 없습니다." });
    res.status(200).json(users);
  } catch (error) {
    res.status(404).json(error);
  }
}

export async function postUser(data) {
  try {
    const user = await new Users(data);
    if (!user) return { code: 404 };

    let result = await new Promise((resolve, reject) => {
      user.save((err, result) => {
        if (err) reject(new Error(err));
        resolve(result);
      });
    });
    return { code: 200, data: result };
  } catch (error) {
    return { code: 404, err: error };
  }
}
