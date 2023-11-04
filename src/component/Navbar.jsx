import React, {  useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { currentToken } from "../feature/auth/authSlice";
import useToken from "../hooks/useToken";

const Navbar = () => {
  const token = useSelector(currentToken);
  const { role } = useToken();

  const navigate = useNavigate();

  const [showDiv, setShowDiv] = useState(false);


  let managerOrSuper = false;

  if (role === "Manager" || role === "Super") {
    managerOrSuper = true;
  } else {
    managerOrSuper = false;
  }

  return (
    <div className="flex items-center justify-between min-h-[3rem] max-h-[3rem] fixed top-0 right-0 left-0 z-50 w-[100vw]  bg-gradient-to-r from-violet-400 to-fuchsia-500 cursor-pointer transition-all duration-300 hover:shadow   shadow-black">
      <div className="flex flex-row items-center">
        <div className="flex flex-row items-center pl-6">
          <p className="text-blue-600 text-3xl pt-1 font-bold">बिक्रि</p>
          <p className="text-yellow-700 text-xl font-bold ">डट</p>
          <p className="text-purple-600 text-xl font-bold">कम </p>
        </div>

        <div className="">
          <div
            onClick={() => {
              if (!token) {
                navigate("/");
              } else {
                navigate("/dash");
              }
            }}
            className="sm:px-4 p-1 rounded-md shadow-sm shadow-black bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-300 hover:bg-gradient-to-r hover:from-green-800 hover:to-blue-700 hover:text-white ml-3 sm:min-w-[7rem] text-center"
          >
            Home
          </div>
        </div>
      </div>
      <div className="flex flex-row items-center mr-3">
        {managerOrSuper && (
          <div
            onClick={() => navigate("/dash/users")}
            className="sm:px-4 p-1 rounded-md shadow-sm shadow-black bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-300 hover:bg-gradient-to-r hover:from-green-800 hover:to-blue-700 hover:text-white ml-3 sm:min-w-[7rem] text-center"
          >
            Users
          </div>
        )}

        <div
          onClick={() => {
            if (!token) {
              navigate("/items/new");
            } else {
              navigate("/dash/items/new");
            }
          }}
          className="sm:px-4 p-1 rounded-md shadow-sm shadow-black bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-300 hover:bg-gradient-to-r hover:from-green-800 hover:to-blue-700 hover:text-white ml-3 sm:min-w-[7rem] text-center"
        >
          Post
        </div>

        <div
          onClick={() => {
            if (!token) {
              navigate("/login");
            } else {
              setShowDiv((prev) => !prev);
            }
          }}
          className="sm:px-4 p-1 rounded-md shadow-sm shadow-black bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-300 hover:bg-gradient-to-r hover:from-green-800 hover:to-blue-700 hover:text-white ml-3 sm:min-w-[7rem] text-center"
        >
          {!token ? "Account" : "Profile"}
        </div>
      </div>

      {/* account div */}
      <div
        onMouseLeave={() => setShowDiv(false)}
        className={`${
          showDiv ? "flex" : "hidden"
        }  flex-col absolute top-[3rem] right-0 px-8 rounded-bl-lg p-2 bg-gradient-to-r from-purple-500 to-pink-500 `}
      >
        <p
          className="px-4 p-2 rounded-md m-1  cursor-pointer bg-gradient-to-r from-cyan-500 to-blue-500 shadow-lg shadow-black hover:text-white"
          onClick={() => {
            setShowDiv((prev) => !prev);
            navigate("/dash/profile");
          }}
        >
          Profile
        </p>

        <p
          className="px-4 p-2 rounded-md m-1  cursor-pointer bg-gradient-to-r from-cyan-500 to-blue-500 shadow-lg shadow-black hover:text-white"
          onClick={() => {
            // setShowDiv((prev) => !prev);
            navigate("/dash/profile/setting");
          }}
        >
          Setting
        </p>
        <p
          className="px-4 p-2 rounded-md m-1  cursor-pointer bg-gradient-to-r from-cyan-500 to-blue-500 shadow-lg shadow-black hover:text-white"
          onClick={() => navigate("/dash/logout")}
        >
          Logout
        </p>
      </div>
    </div>
  );
};

export default Navbar;
