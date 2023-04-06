import { Schema, models, model } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const saltRounds = 10;

const userSchema = new Schema({
  name: String,
  email: String,
  password: String,
});

userSchema.pre("save", function (next) {
  var user = this;

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

userSchema.methods.comparePassword = function (plainPassword, cb) {
  bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
    if (err)
      return (
        cb(err),
        // cb(err, isMatch)
        cb(null, isMatch)
      );
  });
};

userSchema.method.generateToken = function (cb) {
  //JWT 생성
};

const Users = models.user || model("user", userSchema);

export default Users;
