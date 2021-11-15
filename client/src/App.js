import React from "react";
import { Route, Routes } from "react-router";
import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";

import { Header } from "./components/Header";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { NoMatch } from "./pages/NoMatch ";
import { VipJob } from "./pages/VipJob";

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    async function getRefreshToken() {
      try {
        if (!localStorage.getItem("refreshToken")) {
          return;
        }

        const res = await axios.get(
          "http://127.0.0.1:3001/api/v1/users/refreshToken/",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("refreshToken")}`,
            },
            withCredentials: true,
          }
        );

        localStorage.setItem("refreshToken", res.data.refreshToken);
        dispatch({ type: "UPDATE_TOKEN", payload: res.data.accessToken });
        dispatch({ type: "SET_LOGGED_IN", payload: true });
      } catch (error) {
        localStorage.removeItem("refreshToken");
        console.log(error);
      }
    }

    getRefreshToken();
  }, [dispatch]);

  return (
    <div>
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route exact path="/login" element={<Login />}></Route>
        <Route exact path="/jobs/vip-jobs" element={<VipJob />}></Route>
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </div>
  );
}
