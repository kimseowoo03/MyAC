import { NextApiRequest, NextApiResponse } from "next";
import connectMongo from "../../../db/connectMongo";
import { checkEmailExistence } from "../../../db/userController";

export default async function checkEmailExistenceHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await connectMongo().catch(() =>
      res.status(405).json({ message: "db 연결에 실패했습니다. " })
    );

    //이메일 checkEmailExistence 확인
    const { email } = req.body;
    if (!email)
      res.status(400).json({ message: "email의 값이 맞는지 확인해주세요." });

    const result = await checkEmailExistence(email);

    res.status(result.code).json({ message: result.message });
  } catch (error) {
    res.status(405).json({ message: error });
  }
}
