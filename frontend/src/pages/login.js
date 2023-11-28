import React from 'react';
import axios from 'axios';
const baseURL = "http://localhost:5001/api/users"

class Login extends React.Component {
  // state = {
  //   username: null,
  //   email: null,
  //   password: null
  // };

  // onChange(e) {
  //   let username = e.target.username;
  //   let email = e.target.email;
  //   let password = e.target.password;

  //   this.setState({ username, email, password });
  // }

  verifyLogin(e) {

    e.preventDefault();
    axios({
      url: baseURL,
      method: "GET",
    })
      .then((res) => { console.log(res) })
      .catch((err) => { console.log(err) })

  }

  render() {
    return (
      <div class="bg-white p-8 rounded-lg shadow-lg w-96">
        <h1 class="text-2xl font-semibold mb-4">Login</h1>
        <form>
          <div class="mb-4">
            <label for="username" class="block text-gray-600">Username</label>
            <input type="text" id="username" name="username" class="w-full px-3 py-2 border rounded-md" />
          </div>
          <div class="mb-6">
            <label for="password" class="block text-gray-600">Password</label>
            <input type="password" id="password" name="password" class="w-full px-3 py-2 border rounded-md" />
          </div>
          <button type="submit" class="w-full bg-blue-500 text-white rounded-md py-2">Login</button>
          <h2 class="flex justify-center">or</h2>
          <button type="submit" href="/login/federated/google" class="w-full bg-blue-500 text-white rounded-md py-2">Login with google</button>
        </form>
      </div>
    );
  }
}

export default Login;