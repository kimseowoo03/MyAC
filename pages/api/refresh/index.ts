import { NextApiResponse } from "next";
import { ExtendedNextApiRequest } from "../../../middleware/auth";
import { regenerateToken } from "../../../db/userController";
import connectMongo from "../../../db/connectMongo";
export default async function handler(
  req: ExtendedNextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method Not Allowed" });
    return;
  }

  try {
    await connectMongo();
    //헤더 쿠키에 refreshToken 가져와서 유저 정보 찾기
    const refreshToken = req.cookies.refreshToken;
    // const authHeader = req.headers.authorization
    // const accessToken = authHeader?.split(' ')[1]

    // regenerateAccessToken함수에 efreshtoken 넘겨서 Access 재발급 하기
    const result = await regenerateToken(refreshToken);

    if (result.error) {
      res.status(result.code).json({ error: result.error });
    }

    if (result?.code === 200 && result.cookie) {
      res.setHeader("Set-Cookie", result.cookie);
      res
        .status(200)
        .json({ message: result.message, accessToken: result.accessToken });
    }
  } catch (error) {
    res.status(405).json({ error: "Error in the Connection" });
  }
}
