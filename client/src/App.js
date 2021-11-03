import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

export default function App() {
  // use loading state to avoid error while waiting on api request
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:3001/");
        setData(res.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  return (
    <div>
      <h1>Hello World</h1>
      <div>{loading ? "loading" : data.status}</div>
    </div>
  );
}
