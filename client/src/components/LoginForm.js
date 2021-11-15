import React from "react";
import axios from "axios";
import validator from "validator";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export const LoginForm = () => {
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const { username, password } = e.target.elements;

      if (!validator.isEmail(username.value)) {
        setError("Enter a valid email");
        return;
      }

      if (password.value.length < 7) {
        setError("Password must contain at least 8 characters");
        return;
      }

      const res = await axios.post(
        "http://127.0.0.1:3001/api/v1/users/login/",
        {
          email: username.value,
          password: password.value,
        },
        { withCredentials: true }
      );

      // TODO: Set up production development checkpoint here
      localStorage.setItem("refreshToken", res.data.refreshToken);

      dispatch({ type: "UPDATE_TOKEN", payload: res.data.accessToken });
      dispatch({ type: "SET_LOGGED_IN", payload: true });
      dispatch({ type: "SET_USER_DATA", payload: res.data.user });

      setError(null);
      navigate("/");
    } catch (error) {
      console.log("Oops!", error);
      setError("Email or password is incorrect");
    }
  };

  return (
    <div>
      <form className="flex flex-col" onSubmit={handleSubmit}>
        <label className="text-sm" htmlFor="Email">
          Email
        </label>
        <input
          type="text"
          placeholder="Email"
          name="Email"
          id="username"
          autoComplete="none"
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
        <span className="text-red-600">{error ? error : ""}</span>
        <input
          type="submit"
          value="login"
          className={`text-white p-2 rounded-lg bg-blue-600`}
        />
      </form>
    </div>
  );
};
