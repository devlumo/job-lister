import React from "react";
import { Link } from "react-router-dom";
import JobList from "../components/JobList";

import { useSelector } from "react-redux";

export const Home = () => {
  const { loggedIn } = useSelector((state) => state.auth);
  console.log(loggedIn);
  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
      <div className="flex items-center justify-center flex-col">
        <div className="w-full flex items-center justify-center flex-col">
          <JobList />
          {!loggedIn ? <Link to="/login">Login</Link> : "You are logged in!"}
        </div>
      </div>
    </div>
  );
};
