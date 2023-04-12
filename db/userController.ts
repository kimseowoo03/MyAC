/**userController */
import { serialize } from "cookie";
import Users, { User } from "../model/user";

export interface UserResponse {
  loginSuccess?: boolean;
  message?: string;
  code?: number;
  cookie?: string;
};

interface PostUserResponse extends UserResponse {
  data?: Partial<User> & { _id: string }
}


//register
export async function postUser(data: User):Promise<PostUserResponse | undefined> {
  try {
    const user = new Users(data);
    if (!user) return { code: 404 };

    const result = await user.save();
    return { code: 200, data: result };
  } catch (error) {
    return { code: 500, message:  `${error}오류 입니다.` };
  }
}

//login
export async function getUser(userData: User):Promise<UserResponse | undefined> {
  try {
    const user = await Users.findOne({ email: userData.email });

    if (!user)
      return {
        loginSuccess: false,
        message: "이메일에 해당하는 유저가 없습니다.",
      };

    // 요청된 비밀번호와 암호화된 비밀번호 일치한지 확인
    const isMatch = await user.comparePassword(userData.password);
    if (!isMatch) {
       console.log("일치하지않음");
       return { loginSuccess: false, message: "비밀번호가 일치하지 않습니다"}
    }

    const jwt = await user.tokenGenerate();

    const cookie = serialize("token", jwt, {
      httpOnly: true,
      maxAge: 60 * 60 * 24, // 1 day
      sameSite: "strict",
      path: "/",
    });
    
    return {loginSuccess: true, code: 200, cookie}
  } catch (error) {
    console.log(error)
    return;
  }
}
