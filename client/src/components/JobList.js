import React from "react";
import { useEffect } from "react";
import { useState } from "react";

import axios from "axios";

import Job from "./Job";
import Loading from "./Loading";

export default function JobList() {
  const [jobData, setJobData] = useState(null);
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:3001/api/v1/jobs", {
        withCredentials: true,
      });
      setJobData(res.data.jobs);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <ul className="w-full flex items-center justify-center flex-col">
      {loading ? (
        <Loading />
      ) : (
        jobData.map((el) => {
          return <Job key={el._id} name={el.name} />;
        })
      )}
    </ul>
  );
}
