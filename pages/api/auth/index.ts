import { NextApiHandler, NextApiResponse } from "next";
import authMiddleware from "../../../middleware/auth";
import { ExtendedNextApiRequest } from "../../../middleware/auth";

const apiHandler: NextApiHandler = async (
  req: ExtendedNextApiRequest,
  res: NextApiResponse
) => {
  console.log("핸들러", req.token, req.user);
  res.status(200).json({
    _id: req.user._id,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
  });
};

export default authMiddleware(apiHandler);
