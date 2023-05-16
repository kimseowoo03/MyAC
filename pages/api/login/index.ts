import { NextApiRequest, NextApiResponse } from "next";
import connectMongo from "../../../db/connectMongo";
import { getUser } from "../../../db/userController";
import { IUser } from "../../../model/user";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method Not Allowed" });
    return;
  }

  try {
    await connectMongo();

    const result = await getUser(req.body as IUser);

    console.log(result);
    if (result.error) {
      res.status(result.code).json({ error: result.error });
    }

    if (result.code == 200 && result.cookie) {
      res.setHeader("Set-Cookie", result.cookie);
      res.status(200).json({
        message: "로그인 성공, refresh 토큰을 잘 저장했습니다.",
        accessToken: result.accessToken,
      });
    }
  } catch (error) {
    res.status(405).json({ error: "Error in the Connection" });
  }
}
