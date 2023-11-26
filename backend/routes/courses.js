const express = require('express');
const router = express.Router();
const { validationResult, body } = require('express-validator');
const coursesController = require('../controllers/coursesController');

// ROUTE 1: Create a Course
router.post('/createcourse', [
  body('courseName', 'Enter a valid name with size more than 5').isLength({ min: 5 }),
  body('courseCode', 'Enter a valid code with at least 3 digits').isLength({ min: 3 }),
  body('courseDesc', 'Cannot be blank').exists()
], coursesController.createCourse);

// ROUTE 2: Fetch All Courses
router.get('/fetchallcourses', coursesController.fetchAllCourses);

// TODO: Route 3 - Delete a Course (to be implemented later)
// router.post('/deletecourse', coursesController.deleteCourse);

module.exports = router;