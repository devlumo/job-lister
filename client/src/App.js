import React from "react";

import JobList from "./components/JobList";

export default function App() {
  // use loading state to avoid error while waiting on api reques

  return (
    <div className="flex items-center justify-center flex-col w-screen">
      <h1 className="mb-4 mt-2">Jobs</h1>
      <div className="w-full flex items-center justify-center flex-col">
        <JobList />
      </div>
    </div>
  );
}
