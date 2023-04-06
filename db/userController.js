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
    const user = new Users(data);
    if (!user) return { code: 404 };

    const result = await user.save();
    return { code: 200, data: result };
  } catch (error) {
    return { code: 404, err: error };
  }
}

export async function getUser(userData) {
  try {
    const user = await Users.findOne({ email: userData.email });
    if (!user)
      return {
        loginSuccess: false,
        message: "이메일에 해당하는 유저가 없습니다.",
      };
    console.log(user, "사용자가 있음");

    // 요청된 비밀번호와 암호화된 비밀번호 일치한지 확인
    user.comparePassword(userData.password, (err, isMatch) => {
      if (!isMatch)
        return { loginSuccess: false, message: "비밀번호가 틀렸습니다." };

      //비밀번호까지 맞다면 토큰 생성
      user.generateToken((err, user) => {});
    });
  } catch (error) {
    return { code: 404, err: error };
  }
}
