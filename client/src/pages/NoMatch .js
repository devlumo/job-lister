import React from "react";

import { Link } from "react-router-dom";

export const NoMatch = () => {
  return (
    <div>
      <h1 className="text-green-400 text-4xl">404 Not Found!</h1>
      <Link to="/">Home</Link>
    </div>
  );
};
