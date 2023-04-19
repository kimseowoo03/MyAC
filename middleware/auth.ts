import jwt from "jsonwebtoken";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import User from "../model/user";
import { Types } from "mongoose";

interface DecodedToken {
  id: string;
  name: string;
  iat: number;
}

export interface ExtendedNextApiRequest extends NextApiRequest {
  token?: string;
  user?: any;
}

const verifyToken = (token: string): DecodedToken | null => {
  try {
    const decoded = jwt.verify(token, "secretToken");
    return decoded as DecodedToken;
  } catch (err) {
    return null;
  }
};

const authMiddleware =
  (handler: NextApiHandler) =>
  async (req: ExtendedNextApiRequest, res: NextApiResponse) => {
    try {
      // 쿠키에서 인증 토큰 가져오기
      const token = req.cookies.token;
      console.log("미들웨어입니다.");

      if (!token) {
        res.status(401).json({ message: "Token이 없습니다." });
        return;
      }

      // 인증 토큰 복호화 하기
      const decoded = verifyToken(token);

      // 인증 토큰이 올바르지 않으면 401 Unauthorized 반환
      if (!decoded) {
        res.status(401).json({ message: "토큰이 올바르지 않습니다." });
        return;
      }

      // 요청 객체에 사용자 정보 추가
      const matchedUser = await User.findOne({
        _id: new Types.ObjectId(decoded.id),
        name: decoded.name,
      });

      if (!matchedUser) {
        return { isAuth: false, message: "해당 유저가 없습니다." };
      }
      req.token = token;
      req.user = matchedUser;
      // 다음 미들웨어 또는 핸들러 실행
      return await handler(req, res);
    } catch (err) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

export default authMiddleware;
