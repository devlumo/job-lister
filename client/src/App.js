import React from "react";
import { Route, Routes } from "react-router";

import { Header } from "./components/Header";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { NoMatch } from "./pages/NoMatch ";

export default function App() {
  // use loading state to avoid error while waiting on api reques

  return (
    <div>
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route exact path="/login" element={<Login />}></Route>
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </div>
  );
}
