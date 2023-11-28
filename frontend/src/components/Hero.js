import React from 'react';
import Courses from '../pages/courses';

const Hero = () => {
  return (
    <div className="bg-white">
      <div style={{ backgroundImage: `url(${Courses})` }} className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-3xl py-16 sm:py-32 lg:py-40">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Courses at your disposal
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Find any course you like and look at reviews and resources before you make any decision!
              <br />
              Join discussion groups specific to the course.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-y-6 sm:flex-row sm:gap-x-6">
              <a
                href="/courses"
                className="w-full sm:w-auto rounded-md bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Find courses
              </a>
              <a href="/" className="text-sm font-semibold leading-6 text-gray-900">
                Learn more <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
