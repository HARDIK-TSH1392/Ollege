const express = require('express');
const router = express.Router();
const { validationResult, body } = require('express-validator');
const fetchuser = require('../middleware/fetchUser');
const reviewsController = require('../controllers/reviewsController');

// ROUTE 1: Create a Review
router.post('/createreview', [
  body('courseId', 'Course ID cannot be blank').exists(),
  body('review')
    .custom(value => {
      // Your validation logic
      // ...
      return true;
    })
], fetchuser, reviewsController.createReview);

// ROUTE 2: Fetch all Reviews of a course
router.get('/fetchcoursereview/:id', reviewsController.fetchCourseReview);

// ROUTE 3: Fetch all Reviews of a user
router.get('/fetchuserreview', fetchuser, reviewsController.fetchUserReview);

// ROUTE 4: Update a Review of a user
router.put('/updateuserreview/:id', fetchuser, reviewsController.updateUserReview);

// ROUTE 5: Delete a Review of a user
router.delete('/deleteuserreview/:id', fetchuser, reviewsController.deleteUserReview);

module.exports = router;