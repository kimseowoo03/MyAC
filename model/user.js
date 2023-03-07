import { Schema, models, model } from "mongoose";
const bcrypt = require("bcrypt");
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

const Users = models.user || model("user", userSchema);

export default Users;
