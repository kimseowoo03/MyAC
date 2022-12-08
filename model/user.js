import { Schema, models, model } from "mongoose";

const userSchema = new Schema({
  uid: {type: String, index: true, unique: true, required: true},
  goal: String,
  educationCenter: String,
  creditSubjects: Array,
});

const users = models.user || model('user', userSchema)

export default users;