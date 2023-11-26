const request = require('supertest');
const express = require('express');
const app = express();
const authRouter = require('../routes/auth'); // Import your auth.js file or provide the correct path
const User = require('../models/User'); // Import the User model

app.use(express.json());
app.use('/api/auth', authRouter);

// Mock the User model's findOne and create methods
jest.mock('../models/User', () => {
    return {
        findOne: jest.fn(),
        create: jest.fn(),
    };
});

// Mock the bcrypt module
jest.mock('bcryptjs', () => ({
    genSalt: jest.fn(),
    hash: jest.fn(),
    compare: jest.fn()
}));

// Mock the jwt module
jest.mock('jsonwebtoken', () => ({
    sign: jest.fn(() => 'fakeAuthToken'),
}));

describe('ROUTE 1: Create a User', () => {
    // Test case for creating a new user
    it('should create a new user', async () => {
        // Mock User.findOne to return null (user doesn't exist)
        User.findOne.mockResolvedValue(null);

        // Mock bcrypt functions to prevent hashing during testing
        const bcrypt = require('bcryptjs');
        bcrypt.genSalt.mockReturnValue('fakeSalt');
        bcrypt.hash.mockResolvedValue('fakeHash');

        // Define the user data for the test
        const newUser = {
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: 'password123',
        };

        // Mock User.create to resolve with the user data
        User.create.mockResolvedValue(newUser);

        // Mock the jwt module's sign function
        const jwt = require('jsonwebtoken');
        jwt.sign.mockReturnValue('fakeAuthToken');

        const response = await request(app)
            .post('/api/auth/createuser')
            .send(newUser);

        // Assertions
        expect(response.statusCode).toBe(200);
        expect(User.findOne).toHaveBeenCalledWith({ email: newUser.email });
        expect(bcrypt.genSalt).toHaveBeenCalledWith(10);
        expect(bcrypt.hash).toHaveBeenCalledWith(newUser.password, 'fakeSalt');
        expect(User.create).toHaveBeenCalledWith({
            name: newUser.name,
            password: 'fakeHash', // Password should be hashed
            email: newUser.email,
        });
        expect(jwt.sign).toHaveBeenCalledWith({ user: { id: newUser.id } }, 'Thisis@Secret');
        expect(response.body.authToken).toBe('fakeAuthToken');
    });

    // Test case for creating a user with an existing email
    it('should return an error when a user with the same email already exists', async () => {
        // Mock User.findOne to return an existing user
        User.findOne.mockResolvedValue({ email: 'johndoe@example.com' });

        // Define the user data for the test
        const newUser = {
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: 'password123',
        };

        const response = await request(app)
            .post('/api/auth/createuser')
            .send(newUser);

        // Assertions
        expect(response.statusCode).toBe(400);
        expect(response.body.error).toBe('A user with this email already exists');
    });

    // Test case for creating a user with invalid input
    it('should return an error for invalid input during user creation', async () => {
        // Define invalid user data for the test
        const newUser = {
            name: 'Jo',
            email: 'invalidEmail',
            password: '123',
        };

        const response = await request(app)
            .post('/api/auth/createuser')
            .send(newUser);

        // Assertions
        expect(response.statusCode).toBe(400);
        expect(response.body.errors).toBeDefined();
    });

    // Test case for creating a user with an empty name
    it('should return an error when name is empty', async () => {
        const newUser = {
            name: '',  // Empty name
            email: 'johndoe@example.com',
            password: 'password123',
        };

        const response = await request(app)
            .post('/api/auth/createuser')
            .send(newUser);

        // Assertions
        expect(response.statusCode).toBe(400);
        expect(response.body.errors).toBeDefined();
        expect(response.body.errors[0]).toEqual({
            value: newUser.name,
            msg: 'Enter a valid name with a size of at least 3 characters',
            path: 'name', // Adjusted to match the received structure
            type: 'field', // Add the 'type' field to match the received structure
            location: 'body',
        });
    });

    // Test case for creating a user with an empty email
    it('should return an error when email is empty', async () => {
        const newUser = {
            name: 'John Doe',
            email: '',  // Empty email
            password: 'password123',
        };

        const response = await request(app)
            .post('/api/auth/createuser')
            .send(newUser);

        // Assertions
        expect(response.statusCode).toBe(400);
        expect(response.body.errors).toBeDefined();
        expect(response.body.errors[0]).toEqual({
            value: newUser.email,
            msg: 'Enter a valid email',
            path: 'email', // Adjusted to match the received structure
            type: 'field', // Add the 'type' field to match the received structure
            location: 'body',
        });
    });

    // Test case for creating a user with an empty password
    it('should return an error when password is empty', async () => {
        const newUser = {
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '',  // Empty password
        };

        const response = await request(app)
            .post('/api/auth/createuser')
            .send(newUser);

        // Assertions
        expect(response.statusCode).toBe(400);
        expect(response.body.errors).toBeDefined();
        expect(response.body.errors[0]).toEqual({
            value: newUser.password,
            msg: 'Password must be at least 7 characters',
            path: 'password', // Adjusted to match the received structure
            type: 'field', // Add the 'type' field to match the received structure
            location: 'body',
        });
    });
});

describe('ROUTE 2: Authenticate a User', () => {
    // Test case for successful login
    it('should authenticate a user with valid credentials', async () => {
        // Define the user data for the test
        const validUser = {
            email: 'johndoe@example.com',
            password: 'password123',
        };

        // Mock User.findOne to return the user with valid credentials
        User.findOne.mockResolvedValue(validUser);

        // Mock bcrypt compare function to return true (password match)
        const bcrypt = require('bcryptjs');
        bcrypt.compare.mockImplementation((password, hashedPassword) => {
            // Mock bcrypt.compare to check if the password matches
            return new Promise((resolve) => {
                if (password === hashedPassword) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            });
        });

        const response = await request(app)
            .post('/api/auth/login')
            .send(validUser);

        // Assertions
        expect(response.statusCode).toBe(200);
        expect(response.body.authToken).toBe('fakeAuthToken');
    });

    // Test case for incorrect email
    it('should return an error for incorrect email', async () => {
        // Mock User.findOne to return null (user doesn't exist)
        User.findOne.mockResolvedValue(null);

        // Define user data with an incorrect email
        const user = {
            email: 'incorrect@example.com',
            password: 'password123',
        };

        const response = await request(app)
            .post('/api/auth/login')
            .send(user);

        // Assertions
        expect(response.statusCode).toBe(400);
        expect(response.body.error).toBe('Please try to login with correct credentials');
    });

    // Test case for incorrect password (password is missing)
    it('should return an error when the password is missing', async () => {
        const incompleteUser = {
            email: 'johndoe@example.com',
        };

        const response = await request(app)
            .post('/api/auth/login')
            .send(incompleteUser);

        // Assertions
        expect(response.statusCode).toBe(400);
        expect(response.body.errors[0].param).toBe('email');
    });

    // Test case for incorrect password
    it('should return an error when the password is incorrect', async () => {
        // Define a user with a correct email and an incorrect password for the test
        const incorrectPasswordUser = {
            email: 'johndoe@example.com',
            password: 'incorrectPassword',
        };

        // Mock User.findOne to return a user with the correct email
        User.findOne.mockResolvedValue(incorrectPasswordUser);

        // Mock bcrypt compare function to return false (password does not match)
        const bcrypt = require('bcryptjs');
        bcrypt.compare.mockResolvedValue(false);

        const response = await request(app)
            .post('/api/auth/login')
            .send(incorrectPasswordUser);

        // Assertions
        expect(response.statusCode).toBe(400);
        expect(response.body.errors[0].param).toBe('password');
        expect(response.body.errors[0].msg).toBe('Please try to login with correct credentials');

    });
});

describe('ROUTE 3: Get logged-in User Details', () => {
    // Test case for getting user details after login
    it('should return an unauthorized error when the user is not logged in', async () => {
        // No need to mock the fetchuser middleware since it won't set req.user
    
        const response = await request(app)
            .post('/api/auth/getuser');
    
        // Assertions
        expect(response.statusCode).toBe(401);
        expect(response.body.error).toBe('Please authenticate using a valid token');
    });

    // Test case for getting user details without being logged in (unauthorized)
    it('should return an unauthorized error when user is not logged in', async () => {
        // No need to mock the fetchuser middleware since it won't set req.user

        const response = await request(app)
            .post('/api/auth/getuser');

        // Assertions
        expect(response.statusCode).toBe(401);
        expect(response.body.error).toBe('Please authenticate using a valid token');
    });
});