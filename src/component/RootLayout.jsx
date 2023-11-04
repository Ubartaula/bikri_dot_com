import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const RootLayout = () => {
  return (
    <main>
      <Navbar />
      <div className="mt-[3rem] bg-slate-200 h-[100%] min-h-[100vh] w-[100vw]">
        <Outlet />
      </div>
    </main>
  );
};

export default RootLayout;
