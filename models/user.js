const { Schema, model } = require("mongoose");
const { ResumeSchema } = require("./resume");

const UserSchema = new Schema({
  id: Schema.Types.ObjectId,
  name: {
    required: true,
    type: String,
  },
  lastname: {
    required: true,
    type: String,
  },
  email: {
    required: true,
    type: String,
  },
  gender: {
    required: true,
    type: String,
  },
  password: {
    required: true,
    type: String,
  },
  birthday: {
    type: String,
    default: "0",
  },
  resumes: {
    type: [ResumeSchema],
  },
});

module.exports = model("User", UserSchema);
