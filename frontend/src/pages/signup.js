import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
// import axios from 'axios';

const baseURL = "http://localhost:5001/api/auth/createuser";

const Signup = () => {
  const [credentials, setCredentials] = useState({name: "", email: "", password: "", cpassword: ""});
  let history = useNavigate();
  const verifySignup = async (e) => {
    e.preventDefault();
    const {name, email, password} = credentials;

    try {
      const response = await fetch(baseURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password
        }),
      });

      if (!response.ok) {
        throw new Error('Bad request');
      }

      const json = await response.json();
      console.log(json);
      if(json.success){
        // save the auth token and redirect
        localStorage.setItem('token', json.authtoken);
        history('/');
      }
      else{
        alert("Invalid Credentials")
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-2xl font-semibold mb-4">Sign-Up</h1>
        <form onSubmit={verifySignup}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-600">
              Name
            </label>
            <input
              type="text"
              id="name"
              onChange={onChange}
              name="name"
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-600">
              E-mail
            </label>
            <input
              type="text"
              id="email"
              onChange={onChange}
              name="email"
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-600">
              Password
            </label>
            <input
              type="password"
              id="password"
              onChange={onChange}
              minLength={5}
              required
              name="password"
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="cpassword" className="block text-gray-600">
              Confirm Password
            </label>
            <input
              type="password"
              id="cpassword"
              onChange={onChange}
              minLength={5}
              required
              name="cpassword"
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white rounded-md py-2"
          >
            Sign-Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
