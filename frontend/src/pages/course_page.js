import React from 'react';
import { useLoaderData } from 'react-router-dom';
import Course from '../components/Course';
import axios from 'axios';
import Post from './post';
import Navbar from '../components/Navbar';

const baseURL = 'http://localhost:5001/api/courses';

export async function loader({ params }) {
    const course = await axios.get(baseURL + '/' + params.courseCode).then((response) => {
        return response.data;
    });
    return { course };
}

function Course_Page() {
    const { course } = useLoaderData();

    if (!course) return 'No course';

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="flex-grow container mx-auto p-4 md:p-8">
                {/* Add your Course component here */}
                <Course data={course} />
                {/* Add your additional content here */}
                <Post />
            </div>
        </div>
    );
}

export default Course_Page;
