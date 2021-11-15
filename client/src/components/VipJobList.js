import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";

import axios from "axios";

import Job from "./Job";
import Loading from "./Loading";

export default function VipJobList() {
  const [jobData, setJobData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { accessToken } = useSelector((state) => state.auth);

  useEffect(() => {
    async function getData() {
      if (!accessToken) {
        return;
      }

      try {
        const res = await axios.get(
          "http://127.0.0.1:3001/api/v1/jobs/vip-jobs",
          {
            headers: { Authorization: `Bearer ${accessToken}` },
            withCredentials: true,
          }
        );
        setJobData(res.data.jobs);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    getData();
  }, [accessToken]);

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
