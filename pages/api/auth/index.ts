import { NextApiHandler, NextApiResponse } from "next";
import authMiddleware from "../../../middleware/auth";
import { ExtendedNextApiRequest } from "../../../middleware/auth";

const apiHandler: NextApiHandler = async (
  req: ExtendedNextApiRequest,
  res: NextApiResponse
) => {
  try {
    console.log("핸들러");
    res.status(200).json({
      _id: req.user._id,
      isAuth: true,
      email: req.user.email,
      name: req.user.name,
    });
  } catch (error) {
    res.status(500).json({
      message: "서버 오류가 발생했습니다.",
      error: error,
    });
  }
};

export default authMiddleware(apiHandler);
