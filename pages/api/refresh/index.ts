import { NextApiHandler, NextApiResponse } from "next";
import authMiddleware, { ExtendedNextApiRequest } from "../../../middleware/auth";
import { regenerateToken } from "../../../db/userController";

const regenerateAccessTokenHandler: NextApiHandler = async (
  req: ExtendedNextApiRequest,
  res: NextApiResponse
) => {
  try {
    // auth 미들웨어 통과 했으므로 유저 인증 완료.
    console.log("미들웨어 통과 인증 됐어요.")

    // regenerateAccessToken함수에 refreshtoken 넘겨서 Access 재발급 하기
    const result = await regenerateToken(req.token);

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

export default authMiddleware(regenerateAccessTokenHandler);