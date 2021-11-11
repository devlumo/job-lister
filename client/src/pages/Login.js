import React from "react";
import { Link } from "react-router-dom";
import { LoginForm } from "../components/LoginForm";

export const Login = () => {
  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
      <div className="flex items-center justify-center flex-row">
        <div className="w-full flex items-center justify-center flex-row">
          <LoginForm />
          <Link to="/">Home</Link>
        </div>
      </div>
    </div>
  );
};
