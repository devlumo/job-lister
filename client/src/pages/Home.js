import React from "react";
import JobList from "../components/JobList";

export const Home = () => {
  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
      <div className="flex items-center justify-center flex-col">
        <div className="w-full flex items-center justify-center flex-col">
          <JobList />
        </div>
      </div>
    </div>
  );
};
