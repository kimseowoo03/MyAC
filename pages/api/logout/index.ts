import { NextApiHandler, NextApiResponse } from "next";
import authMiddleware from "../../../middleware/auth";
import { ExtendedNextApiRequest } from "../../../middleware/auth";
import User from "../../../model/user";

const apiHandler: NextApiHandler = async (
  req: ExtendedNextApiRequest,
  res: NextApiResponse
) => {
  try {
    // auth 미들웨어 통과했으므로, 해당 유저 id에 토큰을 지워줌
    const logoutUser = await User.findOneAndUpdate(
      { _id: req.user._id },
      { token: "" }
    );
    if (!logoutUser) return res.json({ success: false, Error });
    return res.status(200).send({
      success: true,
      message: "로그아웃 완료",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "서버 오류가 발생했습니다.",
      error: error,
    });
  }
};

export default authMiddleware(apiHandler);
