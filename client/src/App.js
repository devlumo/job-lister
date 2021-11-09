import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

export default function App() {
  // use loading state to avoid error while waiting on api request
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  const getData = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:3001/api/v1/jobs");
      setData(res.data.jobs);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="p-3">
      <h1>Jobs</h1>
      <div className="mt-2">
        {loading ? (
          <p>Loading</p>
        ) : (
          <ul>
            {data.map((el) => (
              <li key={el._id}>{el.name}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
