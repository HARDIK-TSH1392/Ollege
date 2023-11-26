const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Reviews = new Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId, // It's like the foreign key to the User schema
    ref: 'course'
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId, // It's like the foreign key to the User schema
    ref: 'user'
  },
  review: [
    {
      type: String
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

const Review = mongoose.model('review', Reviews);

module.exports = Review;