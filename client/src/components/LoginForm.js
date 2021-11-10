import React from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";

export const LoginForm = () => {
  let navigate = useNavigate();
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const { username, password } = e.target.elements;
      const res = await axios.post(
        "http://127.0.0.1:3001/api/v1/users/login/",
        {
          email: username.value,
          password: password.value,
        }
      );
      /* TODO:
        - Save token in redux
        - Handle errors on frontend
        - Disable button until correct info entered (state)
        - ?Library for checking correct email?
      
      */
      console.log(res.data.token);
      navigate("/");
    } catch (error) {
      console.log("Oops!", error.response);
    }
  };

  return (
    <div>
      <form className="flex flex-col" onSubmit={handleSubmit}>
        <label className="text-sm" htmlFor="Email">
          Email / Username
        </label>
        <input
          type="text"
          placeholder="Email / Username"
          name="Email"
          id="username"
        />
        <label className="text-sm" htmlFor="Password">
          Password
        </label>
        <input
          type="password"
          placeholder="Password"
          name="Password"
          id="password"
        />
        <input
          type="submit"
          value="login"
          className="text-white bg-green-400 p-2 rounded-lg"
        />
      </form>
    </div>
  );
};
