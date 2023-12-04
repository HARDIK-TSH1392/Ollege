import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './pages/home'
import Creators from './pages/creators';
import About from './pages/about'
import Courses from './pages/courses';
import CoursePage,{ loader as courseloader } from './pages/course_page';
import Login from './pages/login'
import Signup from './pages/signup'

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/home",
        element: <Home />,
    },
    {
        path: "/creators",
        element: <Creators />
    },
    {
        path: "/about",
        element: <About />
    },
    {
        path:"/courses",
        element: <Courses />
    },
    {
        path: "/courses/:courseCode",
        element: <CoursePage />,
        loader: courseloader,
    },
    {   
        path:"/login",
        element:<Login />

    },
    {   
        path:"/signup",
        element:<Signup />

    }

])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        {/* <App /> */}
        <RouterProvider router={router} />
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
