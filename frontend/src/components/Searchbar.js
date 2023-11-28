import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Courses from '../pages/courses';

const baseURL = "http://localhost:5001/api/courses";

function Searchbar() {
  const [input, setInput] = useState("");
  const [list, setList] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();

  const fetchData = async (value) => {
    try {
      const response = await axios.get(`${baseURL}?search=${value}`);
      setList(response.data);
      setIsOpen(true);
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle error: setList(null), show error message, etc.
    }
  };

  const searchClicked = () => {
    return (<Courses string={input} />);
  };

  const handleChange = async (value) => {
    setInput(value);
    if (value) {
      await fetchData(value);
    } else {
      setIsOpen(false);
      setList(null);
    }
  };

  const handleItemClick = (e, course) => {
    e.preventDefault();
    navigate('/courses/' + course.courseCode);
  };

  return (
    <>
      <div className="relative md:w-96">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>

        <input
          type="search"
          value={input}
          onChange={(e) => handleChange(e.target.value)}
          id="default-search"
          className="block w-full md:w-80 p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search Courses"
          required
        />

        <button
          onClick={searchClicked}
          type="submit"
          className="text-white absolute right-0 bottom-0 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-2 md:ml-2"
        >
          Search
        </button>
      </div>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          {list.map((el) => (
            <a
              href={`/courses/${el.courseCode}`} // Correct concatenation
              className="block hover:bg-gray-100 px-4 py-2 text-sm text-gray-700"
              key={el.courseCode} // Moved the key prop to the anchor element
              onClick={(event) => handleItemClick(event, el)}
              style={{ cursor: 'pointer' }}
            >
              {el.courseName}
            </a>
          ))}
        </div>
      )}
    </>
  );
}

export default Searchbar;
