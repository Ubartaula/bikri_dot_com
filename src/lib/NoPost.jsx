import React from "react";
import { useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import { currentToken } from "../feature/auth/authSlice";
const NoPost = () => {
  const token = useSelector(currentToken);
  const navigate = useNavigate();
  return (
    <>
      <div className="h-[100vh] w-[100vw] flex flex-col items-center justify-center">
        <p className="text-xl m-2">Sorry, no posts are available</p>
        <button
          onClick={() => {
            if (token) {
              navigate("/dash");
            } else if (!token) {
              navigate("/");
            }
          }}
          className="bg-blue-500 hover:bg-green-500 text-white p-2 rounded-md"
        >
          Back Home
        </button>
      </div>
    </>
  );
};

export default NoPost;
