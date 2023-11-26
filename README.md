# Ollege
This is an in progress project which target the need of college students which is to be able to make better judgements while choosing electives. Usually before opting for a course they try to find people who have taken the course before. This project offeres the following thing:
- You can give reviews to a course that exists in your college.
- You can view reviews on courses of interest given by different students
  Apart from this the second thing that we have to offer is that for a particular course where the reviews will be given, there will also be resources such as Quizes, notes, assignments of that course available. We also plan to add a discussion group for each course to discuss things regarding it.

## Getting Started
Just clone the repository to your local machine. Just go on the repository, click the drop-down button. Either download the zip or copy the http link and then on your local machine run the command
```
git clone <http-link>
```

### Prerequisites
Make sure you have the following things installed on your system:
- React
- Node
- MongoDB
- Git

### Installing
Getting the installation for it is very easy, once you have the project on your local machine with all the prerequisites downloaded just open terminal and run the following commands
```
cd <location where you have downloaded the project>
```
The project will be in a folder Ollege which will contain two main folders- frontend & backend.

To setup frontend:
```
cd frontend
npm i
```
Once this is installed run:
```
npm start
```
There should be a new tab opened in your browser which will render the frontend

To setup backend (make sure you are outside frontend directory and inside Ollege):
```
cd backend
npm i
```
After having it installed you can run:
```
nodemon index.js
```
This will begin the backend server

## Running the tests
For frontend, go into the frontend directory then just run:
```
npm test
```
This will run the test cases and if everything is right, you'll have all the test casees passed

For backend, go into the backend directory and run the same command that is:
```
npm test
```

## Built With- MERN Stack
*[React](https://react.dev/) - Frontend Framework
*[Express](https://expressjs.com/) - Web framwork
*[MongoDB](https://www.mongodb.com/) - Database Management

