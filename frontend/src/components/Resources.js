import React, { useState } from 'react';

const Resources = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative inline-block text-left">
            <div>
                <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className={`inline-flex justify-center w-full md:w-auto rounded-md px-4 py-2 text-sm font-medium ${isOpen ? 'bg-navy-blue text-black' : 'bg-[#6495ED] text-navy-blue'} hover:bg-white hover:text-[#6495ED] focus:outline-none focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition-all`}
                >
                    Resources
                    {/* Dropdown arrow */}
                    <svg
                        className="-mr-1 ml-2 h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                    >
                        <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                        />
                    </svg>
                </button>
            </div>

            {/* Dropdown content */}
            {isOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-56 md:w-64 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div className="py-1">
                        <a href="/" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Notes</a>
                        <a href="/" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Quizzes</a>
                        <a href="/" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Assignments</a>
                        <a href="/" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Tutorials</a>
                        <a href="/" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Labs</a>
                        <a href="/" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Midsems</a>
                        <a href="/" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Endsems</a>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Resources;
