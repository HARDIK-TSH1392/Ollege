const request = require('supertest');
const express = require('express');
const app = express();
const coursesRouter = require('../routes/courses'); // Import your courses.js file or provide the correct path
const Courses = require('../models/Courses'); // Import the Courses model

app.use(express.json());
app.use('/api/courses', coursesRouter);

// Mock the Courses model's findOne and create methods
jest.mock('../models/Courses', () => ({
    findOne: jest.fn(),
    create: jest.fn(),
    find: jest.fn(),
}));

describe('ROUTE 1: Create a Course', () => {
    // Test case for creating a new course
    it('should create a new course with valid data', async () => {
        // Mock Courses.findOne to return null (no existing course with the same name or code)
        Courses.findOne.mockResolvedValue(null);
    
        // Define the course data for the test
        const newCourse = {
            courseName: 'Test Course',
            courseCode: 'TEST123',
            courseDesc: 'This is a test course',
        };
    
        // Mock Courses.create to resolve with the course data
        Courses.create.mockResolvedValue(newCourse);
    
        const response = await request(app)
            .post('/api/courses/createcourse')
            .send(newCourse);
    
        // Assertions
        expect(response.statusCode).toBe(200);
        
        // Check that Courses.findOne was called with the expected queries for courseName and courseCode
        expect(Courses.findOne).toHaveBeenCalledWith({ courseName: newCourse.courseName });
        expect(Courses.findOne).toHaveBeenCalledWith({ courseCode: newCourse.courseCode });
        
        expect(Courses.create).toHaveBeenCalledWith(newCourse);
    });

    // Test case for creating a course with an existing course name or code
    it('should return an error when a course with the same name or code already exists', async () => {
        // Mock Courses.findOne to return an existing course
        Courses.findOne.mockResolvedValue({ courseName: 'Test Course' });

        // Define course data with the same name as an existing course
        const duplicateCourse = {
            courseName: 'Test Course',
            courseCode: 'UNIQUE123',
            courseDesc: 'This is a duplicate course',
        };

        const response = await request(app)
            .post('/api/courses/createcourse')
            .send(duplicateCourse);

        // Assertions
        expect(response.statusCode).toBe(400);
        expect(response.body.error).toMatch(/already exists/);
    });

    // Test case for creating a course with invalid input
    it('should return an error for invalid input during course creation', async () => {
        // Define invalid course data for the test
        const invalidCourse = {
            courseName: 'T', // Invalid name
            courseCode: '12', // Invalid code
            courseDesc: '',  // Empty description
        };

        const response = await request(app)
            .post('/api/courses/createcourse')
            .send(invalidCourse);

        // Assertions
        expect(response.statusCode).toBe(400);
        expect(response.body.errors).toBeDefined();
    });
});

describe('ROUTE 2: Fetch All Courses', () => {
    it('should return all courses', async () => {
        const expectedCourses = [{ courseName: 'Course 1' }, { courseName: 'Course 2' }];
        Courses.find.mockResolvedValue(expectedCourses);

        const response = await request(app).get('/api/courses/fetchallcourses');

        expect(response.status).toBe(200);
        expect(response.body).toEqual(expectedCourses);
    });

    it('should handle errors and return 500 for internal server error', async () => {
        Courses.find.mockRejectedValue(new Error('Internal Server Error'));

        const response = await request(app).get('/api/courses/fetchallcourses');

        expect(response.status).toBe(500);
        expect(response.text).toContain('Internal Server Error');
    });
});

