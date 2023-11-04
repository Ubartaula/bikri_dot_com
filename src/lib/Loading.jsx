import React from "react";

const Loading = () => {
  return (
    <div className="fixed top-0 bottom-0 left-0 right-0  w-screen h-screen opacity-50 bg-slate-200 flex items-center justify-center text-3xl font-mono ">
      <p className="border-2 border-green-700 p-3 rounded-full h-[12rem] w-[12rem] sm:h-[24rem] sm:w-[24rem] grid place-content-center text-center bg-slate-700 animate-pulse text-white">
        {" "}
        Loading...
      </p>
    </div>
  );
};

export default Loading;
