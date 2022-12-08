import { Schema, models, model } from "mongoose";

const completionPlanSchema = new Schema({
  _id: Schema.Types.ObjectId,
  classificationOfCourse: { type:String, required: true},
  acquisitionCenter: { type:String, required: true},
  subjectName: { type:String, required: true},
  score: { type:String, required: true},
});

const completionPlans = models.completionPlan || model('completionPlan', completionPlanSchema)

export default completionPlans;