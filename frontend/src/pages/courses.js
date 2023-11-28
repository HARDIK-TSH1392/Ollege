import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import Navbar from '../components/Navbar';
import axios from 'axios';

const baseURL = 'http://localhost:5001/api/courses';

function Courses({ string = '' }) {
    const [courses, setCourses] = useState(null);

    useEffect(() => {
        if (string === '') {
            axios.get(`${baseURL}/fetchallcourses`).then((response) => {
                setCourses(response.data);
            });
        } else {
            axios.get(`${baseURL}?search=${string}`).then((response) => {
                setCourses(response.data);
            });
        }
    }, [string]);

    if (!courses) return 'No reviews';

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="flex-grow container mx-auto p-4 md:p-8">
                {courses.map((el, index) => (
                    <Card key={index} data={{ name: el.courseName, instructor: el.courseInstructor, coursecode: el.courseCode }} />
                ))}
            </div>
        </div>
    );
}

export default Courses;
