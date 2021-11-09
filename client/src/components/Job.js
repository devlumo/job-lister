import React from "react";

export default function Job({ name }) {
  return (
    <li className="p-2 rounded-md w-1/3 shadow-md border-t-1 mb-2">{name}</li>
  );
}
