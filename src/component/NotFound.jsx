import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="h-[100vh] w-[100vw] flex flex-col items-center justify-center">
        <p className="text-xl m-2 p-2">
          Sorry, the page you visited does not exist
        </p>
        <button
          onClick={() => navigate("/")}
          className="bg-blue-500 hover:bg-green-500 text-white p-2 rounded-md"
        >
          Back Home
        </button>
      </div>
    </>
  );
};

export default NotFound;
