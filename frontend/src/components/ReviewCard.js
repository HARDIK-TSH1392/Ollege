import React, { useState } from 'react';

const ReviewCard = ({ reviewData }) => {
    const [expandedIndex, setExpandedIndex] = useState(null);

    const handleToggleExpand = (index) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };

    return (
        <div className="bg-gray-100 p-4 mt-4 border-black border-2 rounded-lg">
            <h2 className="text-2xl font-bold mb-2">Reviews</h2>
            {reviewData.map((review, index) => (
                <div
                    key={index}
                    className="flex flex-col md:flex-row mb-4 border-black border-2 p-4 rounded-lg"
                    style={{ boxShadow: '0 8px 12px rgba(0, 0, 0, 0.2)' }}
                >
                    {/* Left side containing name and date */}
                    <div className="md:w-1/3 mb-4 md:mb-0">
                        <h3 className="text-xl font-semibold mb-2">{review.name}</h3>
                        <p className="text-gray-600">{review.date}</p>
                    </div>

                    {/* Right side containing reviews */}
                    <div className="md:w-2/3">
                        <ul className={`overflow-hidden ${expandedIndex === index ? 'h-auto' : 'h-24'}`}>
                            {review.reviews.map((text, i) => (
                                <li key={i}>{"-"} {text}</li>
                            ))}
                        </ul>
                        {review.reviews.length > 2 && (
                            <button
                                className="text-blue-500 hover:underline cursor-pointer"
                                onClick={() => handleToggleExpand(index)}
                            >
                                {expandedIndex === index ? 'Read Less' : 'Read More'}
                            </button>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ReviewCard;
