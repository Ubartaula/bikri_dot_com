import React from "react";
import { useNavigate } from "react-router-dom";

const DeleteConfirmation = ({ handleDelete, navigatePath, setYesNo }) => {
  const navigate = useNavigate();
  return (
    <div className="fixed top-1 bottom-1 left-1 right-1 flex flex-col items-center justify-center ">
      <div className="bg-orange-300 p-20 rounded-md">
        <p className="text-xl">Are you sure to Delete ?</p>
        <div className="flex items-center justify-center">
          <button
            onClick={handleDelete}
            className="bg-green-600 hover:bg-red-600 text-white p-1 px-4 rounded-md m-2"
          >
            Yes
          </button>
          <button
            onClick={() => {
              navigate(navigatePath);
              setYesNo(false);
            }}
            className="bg-green-600 hover:bg-red-600 text-white p-1 px-4 rounded-md m-2"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(DeleteConfirmation);
