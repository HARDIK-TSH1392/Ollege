import { Link } from "react-router-dom";
import Searchbar from "./Searchbar";

function Navbar() {
  return (
    <>
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link to="/" className="flex items-center">
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">KourseLera</span>
          </Link>

          <div className="flex w-full md:w-auto mt-4 md:mt-0">
            <ul className="font-medium flex flex-col md:flex-row md:space-x-8 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <Link
                  to="/home"
                  className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                  aria-current="page"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="block py-2 pl-3 pr-4 text-white rounded hover:bg-gray-100 bg-transparent md:border-0  md:p-0 dark:text-white md:dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/creators"
                  className="block py-2 pl-3 pr-4 text-white rounded hover:bg-gray-100 bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Creators
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex-initial w-full mt-4 md:w-1/2 md:mt-0">
            <Searchbar />
          </div>

          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center md:ml-3 md:mr-0 md:w-auto dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Login/Signup
          </button>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
