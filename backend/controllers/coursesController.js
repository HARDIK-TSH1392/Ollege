const Courses = require('../models/Courses');
const { validationResult, body } = require('express-validator');

// Route handler for creating a course
exports.createCourse = async (req, res) => {
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    // Check whether the course name or course code exists already
    try {
        let courseName = await Courses.findOne({ courseName: req.body.courseName });
        let courseCode = await Courses.findOne({ courseCode: req.body.courseCode });
        if (courseName || courseCode) {
            return res.status(400).json({ error: `Sorry a course with the course name: ${courseName} or course code: ${courseCode} already exists` })
        }

        // Create a new Course
        let course = await Courses.create({
            courseName: req.body.courseName,
            courseCode: req.body.courseCode,
            courseDesc: req.body.courseDesc
        });

        res.json(course);

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
};

// Route handler for fetching all courses
exports.fetchAllCourses = async (req, res) => {
    try {
        const courses = await Courses.find();
        res.json(courses);
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
};

// TODO: Add a route handler for deleting a course (once implemented)
exports.deleteCourse = async (req, res) => {
    // Your code to delete a course
    // ...

    // Return response
};
