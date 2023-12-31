import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
// import axios from 'axios';

const baseURL = "http://localhost:5001/api/auth/login";

const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  let history = useNavigate();

  const verifyLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(baseURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
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
        <h1 className="text-2xl font-semibold mb-4">Login</h1>
        <form onSubmit={verifyLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-600">
              E-mail
            </label>
            <input
              type="text"
              value={credentials.email}
              onChange={onChange}
              id="email"
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
              value={credentials.password}
              onChange={onChange}
              id="password"
              name="password"
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white rounded-md py-2"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
