import React from "react";
import { Link } from "react-router-dom";
import VipJobList from "../components/VipJobList";

import { useSelector } from "react-redux";

export const VipJob = () => {
  const { loggedIn } = useSelector((state) => state.auth);
  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
      <div className="flex items-center justify-center flex-col">
        <div className="w-full flex items-center justify-center flex-col">
          <VipJobList />
          {!loggedIn ? <Link to="/login">Login</Link> : "You are logged in!"}
        </div>
      </div>
    </div>
  );
};
