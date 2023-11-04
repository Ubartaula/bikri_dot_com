import React, { useEffect } from "react";
import { useSendLogoutMutation } from "./authApiSlice";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();
  const [logoutMutation, { isSuccess }] = useSendLogoutMutation();

  const handleLogout = async () => {
    try {
      await logoutMutation();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/");
    }
  }, [isSuccess, navigate]);

  return (
    <div className="flex flex-col items-center justify-between p-3">
      <div className="p-10 text-lg font-semibold">Are you sure to logout ?</div>
      <button
        onClick={handleLogout}
        className="bg-blue-600 text-white p-2 min-w-[8rem] shadow-sm shadow-black rounded-lg hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
};

export default Logout;
