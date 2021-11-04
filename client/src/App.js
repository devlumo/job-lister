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
    <div>
      <h1>Jobs</h1>
      <div>
        {loading ? (
          <p>Loading</p>
        ) : (
          data.map((el) => <p key={el._id}>{el.name}</p>)
        )}
      </div>
    </div>
  );
}
