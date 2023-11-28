import React from 'react';
import Resources from '../components/Resources';
import ReviewCard from '../components/ReviewCard';

const Post = () => {
    // Temporary data
    const postData = {
        courseName: "SDOS",
        courseCode: "CS530",
        courseDesc: "This is a course based on software development using open source tools"
    };

    const reviewData = [
        {
            name: "Hardik",
            date: "25-11-2023",
            reviews: ["The load of the course was pretty descent", "There was no strict attendance policy", "There were chances of surprise quizzes"]
        },
        {
            name: "Aryan",
            date: "2-11-2023",
            reviews: ["The load of the course was pretty easy", "Coming to class was not that much important", "Surprise quizzes could be there"]
        },
        {
            name: "Sara",
            date: "10-12-2023",
            reviews: ["The course content was well-structured", "Instructors were knowledgeable and supportive", "Great hands-on projects"]
        },
        {
            name: "Alex",
            date: "5-12-2023",
            reviews: ["Challenging assignments that enhance learning", "Good balance between theory and practicals", "Regular feedback improved my understanding"]
        },
        {
            name: "Emily",
            date: "15-12-2023",
            reviews: ["The course covered a wide range of topics", "Engaging discussions during lectures", "Collaborative group projects were valuable"]
        }
    ];

    return (
        <div className="max-w-3xl mx-auto mt-8">
            <div className="flex flex-col items-center">
                <div className="mb-4 text-center">
                    <h1 className='text-6xl font-bold text-[#0F52BA] mb-2'>{postData.courseName}</h1>
                    <h3 className='text-xl font-bold text-[#002D62] mb-2'>{postData.courseCode}</h3>
                    <p className='text-lg font-bold text-[#002D62]'>{postData.courseDesc}</p>
                </div>
                <div className="md:ml-auto">
                    <Resources />
                </div>
            </div>
            <div className="mt-4 ">
                <ReviewCard reviewData={reviewData} />
            </div>
        </div>
    );
};

export default Post;
