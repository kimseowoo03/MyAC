import { Document, Model, Schema, models, model } from "mongoose";

import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const saltRounds = 10;

export interface IUser extends Document{
  name?: string;
  email: string;
  password: string;
  token?: string;
  comparePassword: (plainPassword: string) => Promise<boolean>;
  tokenGenerate: () => Promise<string>;
  findByToken: (token: string) => Promise<string>;
}

const userSchema = new Schema<IUser>({
  name: String,
  email: String,
  password: String,
  token: String,
});

userSchema.pre<IUser>("save", function (next) {
  let user = this;

  if (user.isModified("password")) {
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err);

      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

userSchema.methods.comparePassword = async function (plainPassword: string) {
  try {
    const same = await bcrypt.compare(plainPassword, this.password);
    return same;
  } catch (error) {
    throw error;
  }
};

userSchema.methods.tokenGenerate = async function () {
  try {
    // JWT 생성
    let user = this;
    // 시크릿 토큰 나중에 env로 빼서 설정
    let payload = {"id": user._id.toHexString(), "name": user.name}
    let token = jwt.sign(payload, "secretToken");

    // // DB에 토큰 저장
    user.token = token;
    await user.save();
    return token;
  } catch (error) {
    throw error;
  }
};

userSchema.methods.findByToken = async function (token: string) {
  try {
    let user = this;
    //토큰 복호화
    let decoded =  jwt.verify(token, "secretToken"); // user id가 나옴

    //복화화 해서 나온 유저 id가 DB에도 있는지 확인, 토큰까지 일치하는지 확인
    let matchedUser = await user.findOne({ _id: decoded, token: token });
    return matchedUser;
  } catch (error) {
    return error;
  }
};

const User: Model<IUser> = models.user || model<IUser>("user", userSchema);

export default User;
