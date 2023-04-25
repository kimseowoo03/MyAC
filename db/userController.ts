/**userController */
import { serialize } from "cookie";
import User, { IUser } from "../model/user";
import { verifyToken } from "../middleware/auth";

export interface UserResponse {
  loginSuccess?: boolean;
  message?: string;
  code?: number;
  cookie?: string;
  accessToken?: string;
  error?: Error;
}

//register
export async function postUser(data: IUser) {
  try {
    const user = new User(data);
    if (!user) return { code: 404 };

    const result = await user.save();
    return { code: 200, data: result };
  } catch (error) {
    return { code: 500, message: `${error}오류 입니다.` };
  }
}

//login
export async function getUser(userData: IUser) {
  try {
    const user = await User.findOne({ email: userData.email });

    if (!user) {
      throw new Error("이메일에 해당하는 유저가 없습니다.");
    }

    // 요청된 비밀번호와 암호화된 비밀번호 일치한지 확인
    const isMatch = await user.comparePassword(userData.password);
    if (!isMatch) {
      throw new Error("비밀번호가 일치하지 않습니다");
    }

    const { accessToken, refreshToken } = await user.tokenGenerate();

    const cookie = serialize("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
    });

    return { loginSuccess: true, code: 200, cookie, accessToken };
  } catch (error) {
    return { error: (error as Error).message, loginSuccess: false, code: 401 };
  }
}

//Access Token 재발급
export async function regenerateToken(reqRefreshToken: string | undefined) {
  try {
    if (!reqRefreshToken) {
      throw new Error("Token이 없습니다.");
    }

    //전달 받은 refreshToken 분해해서 Access Token 구해서 복호화
    const refreshTokenPayload = verifyToken(reqRefreshToken);

    // //유저가 있는지 확인
    let user;
    if (refreshTokenPayload) {
      user = await User.findOne({
        id: refreshTokenPayload.id,
        name: refreshTokenPayload.name,
      });
    }

    if (!user) {
      throw new Error("요청하신 유저가 없습니다.");
    }

    if (user.token !== reqRefreshToken) {
      throw new Error(`${user.name}님의 refresh token이 일치하지 않습니다.`);
    }

    //tokenGenerate 사용해서 토큰 재생성
    const { accessToken, refreshToken } = await user.tokenGenerate();

    //cookie에 새로운 refresh token담고, 새로 만든 accesstoken 새로운 토큰 담아 반환
    const cookie = serialize("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
    });

    return {
      message: "토큰을 성공적으로 재발급 했습니다.",
      code: 200,
      cookie,
      accessToken,
    };
  } catch (error) {
    return { error: (error as Error).message, code: 401 };
  }
}
