import { Document, Model, Schema, models, model } from "mongoose";

import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const saltRounds = 10;

export interface User extends Document{
  name?: string;
  email: string;
  password: string;
  token?: string;
  comparePassword: (plainPassword: string) => Promise<boolean>;
  tokenGenerate: () => Promise<string>;
}

const userSchema = new Schema<User>({
  name: String,
  email: String,
  password: String,
  token: String,
});

userSchema.pre<User>("save", function (next) {
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

const Users: Model<User> = models.user || model<User>("user", userSchema);

export default Users;
