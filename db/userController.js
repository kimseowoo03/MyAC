/**userController */
import { serialize } from "cookie";
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

//register
export async function postUser(data) {
  try {
    const user = new Users(data);
    if (!user) return { code: 404 };

    const result = await user.save();
    return { code: 200, data: result };
  } catch (error) {
    return { code: 404, err: error };
  }
}

//login
export async function getUser(userData) {
  try {
    const user = await Users.findOne({ email: userData.email });

    if (!user)
      return {
        loginSuccess: false,
        message: "이메일에 해당하는 유저가 없습니다.",
      };

    // 요청된 비밀번호와 암호화된 비밀번호 일치한지 확인
    const isMatch = await user.comparePassword(userData.password);
      if (!isMatch) return console.log("일치하지않음");

    const jwt = await user.tokenGenerate();

    const cookie = serialize("token", jwt, {
      httpOnly: true,
      maxAge: 60 * 60 * 24, // 1 day
      sameSite: "strict",
      path: "/",
    });
    
    return {code: 200, cookie}
  } catch (error) {
    return console.log(error)
  }
}
