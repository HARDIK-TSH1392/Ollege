let Review = require('../models/Reviews');
const { validationResult, body } = require('express-validator');
var fetchuser = require('../middleware/fetchUser');

// Route handler for creating a review
exports.createReview = async (req, res) => {
  // If there are errors, return Bad request and the errros
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
  }
  try {
      const { courseId, review } = req.body;
      // If there are no errors return Bad Requests and the errors
      if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
      }
      const reviews = new Review({ courseId, userId: req.user.id, review })
      const saveReview = await reviews.save();
      res.json(saveReview);
  } catch (error) {
      console.error(error.messsage);
      res.status(500).send("Internal Server Error:");
  }
};

// Route handler for fetching all reviews of a course
exports.fetchCourseReview = async (req, res) => {
    try {
        // Find all the reviews with the given course id
        const courseReviews = await Review.find({ courseId: req.params.id });

        if (courseReviews.length === 0) {
            return res.status(404).send("Not Found");
        }

        res.json(courseReviews);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error!");
    }
};

// Route handler for fetching all reviews of a user
exports.fetchUserReview = async (req, res) => {
    try {
        // Find all the reviews given by a user
        const userReviews = await Review.find({ userId: req.user.id });

        if (userReviews.length === 0) {
            return res.status(404).send("Not Found");
        }

        res.json(userReviews);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error!");
    }
};

// Route handler for updating a user's review
exports.updateUserReview = async (req, res) => {
    const {courseId, review} = req.body;
    try {
        // Create a new Review Object
        const newReview = {};
        newReview.courseId = courseId;
        if(review) {newReview.review = review}

        // Find the review to be updated and update it
        let reviewInDatabase = await Review.findById(req.params.id);
        if (!reviewInDatabase) {
            return res.status(404).send("Review Not Found");
        }

        // Check if the logged in person is accessing his own resource
        if(reviewInDatabase.userId.toString() !== req.user.id){
            return res.status(401).send("Not Allowed")
        }

        //new: true means that if a new contact comes in, it gets created
        reviewInDatabase = await Review.findByIdAndUpdate(req.params.id, {$set: newReview}, {new: true})
        res.json({reviewInDatabase});
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error!");
    }
};

// Route handler for deleting a user's review
exports.deleteUserReview = async (req, res) => {
    try {
        // Find the review to be deleted and delete it
        let deleteReview = await Review.findById(req.params.id);
        if(!deleteReview) { res.status(404).send("Not Found")}

        // Allow deletion only if User owns this Review
        if(deleteReview.userId.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed")
        }
        deleteReview = await Review.findByIdAndRemove(req.params.id);
        res.json({ "Success: ": "Review has been deleted", deleteReview: deleteReview});
    } catch (error) {
        console.log(error.message);
        res.status(500).send("internal Server Error!");
    }
};
