const mongoose = require('mongoose');
const { Schema } = mongoose;

const CourseSchema = new Schema({
  courseName:{
    type: String,
    require: true
  },
  courseCode:{
    type: String,
    require: true,
    unique: true
  },
  courseDesc:{
    type: String,
    require: true
  },
  courseResources:{
    notes: {},
    quizez: {},
    assignment: {},
    tutorials: {},
    labs: {},
    midsem: {},
    endsem: {}
  },
  date:{
    type: Date,
    default: Date.now
  }
});

const Course = mongoose.model('course', CourseSchema);
module.exports = Course;