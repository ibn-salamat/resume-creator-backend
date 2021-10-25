const { Schema, model } = require("mongoose");

const ContactSchema = new Schema({
  title: {
    required: true,
    type: String,
  },
  value: {
    required: true,
    type: String,
  },
});

const WorkSchema = new Schema({
  place: {
    required: true,
    type: String,
  },
  position: {
    required: true,
    type: String,
  },
  startDate: {
    required: true,
    type: String,
  },
  endDate: {
    required: true,
    type: String,
  },
});

const EducationSchema = new Schema({
  place: {
    required: true,
    type: String,
  },
  profession: {
    required: true,
    type: String,
  },
  startDate: {
    required: true,
    type: String,
  },
  endDate: {
    required: true,
    type: String,
  },
});

const ResumeSchema = new Schema({
  authorId: {
    required: true,
    type: Schema.Types.ObjectId,
  },
  template: {
    required: true,
    type: String,
  },
  title: {
    required: true,
    type: String,
  },
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
  birthday: {
    required: true,
    type: String,
  },
  skills: {
    required: true,
    type: String,
  },
  about: {
    required: true,
    type: String,
  },
  contacts: {
    required: true,
    type: [ContactSchema],
  },

  education: [EducationSchema],
  work: [WorkSchema],
});

module.ResumeSchema = ResumeSchema;
module.exports = model("Resume", ResumeSchema);
