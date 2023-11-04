import React from "react";
import { useGetUsersQuery } from "./userApiSlice";
import { FixedSizeList as List } from "react-window";
import { useNavigate } from "react-router-dom";
import GetWindowSize from "../../lib/GetWindowSize";

const ListUser = () => {
  const navigate = useNavigate();
  const { windowSize } = GetWindowSize();

  const { users, isLoading, isError, error } = useGetUsersQuery("listUsers", {
    selectFromResult: ({ data, isLoading, isSuccess, isError, error }) => ({
      users: data?.ids?.map((id) => data?.entities[id]),
      isLoading,
      isSuccess,
      isError,
      error,
    }),
  });

  if (isLoading) {
    return <p>Users login page is loading...</p>;
  }
  if (isError) {
    return <p>Users page has error , the message is :{error?.data?.message}</p>;
  }

  // react-window

  const Row = ({ index, style }) => {
    /// get any if you want here
    const user = users[index];
    const status = user?.isActive ? "Active" : "Inactive";

    return (
      <div
        style={style}
        className="flex flex-row items-center border border-gray-100 m-1 p-2 pr-4 "
      >
        <p className="p-2 w-[8rem] min-w-[8rem] whitespace-nowrap text-ellipsis overflow-hidden">
          {user.firstName}
        </p>
        <p className="p-2 w-[8rem] min-w-[8rem] whitespace-nowrap text-ellipsis overflow-hidden">
          {user.lastName}
        </p>
        <p className="p-2 w-[8rem] min-w-[8rem] whitespace-nowrap text-ellipsis overflow-hidden">
          {user.phoneNumber}
        </p>
        <p className="p-2 w-[13rem] min-w-[13rem] text-ellipsis overflow-hidden">
          {user.email}
        </p>
        <p className="p-2 w-[8rem] min-w-[8rem]">{status}</p>
        <p className="p-2 w-[8rem] min-w-[8rem]">{user.role}</p>

        <button
          onClick={() => navigate(`/dash/users/${user?._id}`)}
          className="bg-blue-500 text-white px-2 rounded-lg w-[4rem]"
        >
          Edit
        </button>
      </div>
    );
  };

  return (
    <div className="">
      <div className="p-2">
        <button
          onClick={() => navigate("/dash/users/new")}
          className="bg-blue-600 hover:bg-green-600 rounded-lg text-white p-2 px-3 min-w-[8rem]"
        >
          Create New User
        </button>
      </div>
      <h1 className="text-bold/30 p-2 underline-offset-4 underline">
        List of Users
      </h1>
      <div className="flex flex-row items-center font-bold">
        <p className="p-2 min-w-[8rem]">First Name</p>
        <p className="p-2 min-w-[8rem]">Last Name</p>
        <p className="p-2 min-w-[8rem]">Mobile</p>
        <p className="p-2 min-w-[13rem]">Email</p>
        <p className="p-2 min-w-[8rem]">Status</p>
        <p className="p-2 min-w-[8rem]">User Role</p>
        <p className="p-2 min-w-[8rem]">Edit</p>
      </div>
      <List
        height={windowSize.height || 0}
        itemCount={users?.length || 0}
        itemSize={30}
        layout="vertical"
        width={windowSize.width || 0}
      >
        {Row}
      </List>
    </div>
  );
};

export default ListUser;
