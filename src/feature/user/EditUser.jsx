import React, { useEffect, useState } from "react";
import {
  useDeleteUserMutation,
  useEditUserMutation,
  useGetUsersQuery,
} from "./userApiSlice";
import { useNavigate, useParams } from "react-router-dom";
import DeleteConfirmation from "../../lib/DeleteConfirmation";

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useGetUsersQuery("listUsers", {
    selectFromResult: ({ data }) => ({
      user: data?.entities[id],
    }),
  });

  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || "");
  const [role, setRole] = useState(user?.role || "");
  const [isActive, setIsActive] = useState(user?.isActive || "");
  const [password, setPassword] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [checkBox, setCheckBox] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [yesNo, setYesNo] = useState(false);

  const [editUserMutation, { isSuccess }] = useEditUserMutation();
  const [deleteUserMutation, { isSuccess: isDelSucc }] =
    useDeleteUserMutation();

  const handleEditUser = async () => {
    try {
      await editUserMutation({
        id: user?.id,
        firstName,
        lastName,
        email,
        phoneNumber,
        password,
        role,
        isActive,
      });
    } catch (error) {
      setErrMsg(error?.data?.message);
      console.log(error);
    }
  };

  useEffect(() => {
    if (confirmPw && password !== confirmPw) {
      setErrMsg("Repeat password did not match");
    } else {
      setErrMsg("");
    }
  }, [password, confirmPw]);

  useEffect(() => {
    if (isSuccess || isDelSucc) {
      navigate("/dash/users");
    }
  }, [isSuccess, isDelSucc, navigate]);

  // handle Delete

  const handleDelete = async () => {
    try {
      await deleteUserMutation({ id: user?.id });
      setYesNo(false);
    } catch (error) {
      setErrMsg(error?.data?.message);
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="m-auto w-[100vw] max-w-lg p-2 "
    >
      <div className="flex flex-col p-4 bg-slate-100 rounded-md max-w-lg">
        <div className="min-h-[2rem] text-red-600" aria-live="assertive">
          {errMsg}
        </div>
        <h2 className="py-2 font-bold">Edit User Form</h2>

        <label htmlFor="">Fist Name</label>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="border border-blue-500 p-1 px-3 rounded-md"
        />
        <label htmlFor="">Last Name</label>
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="border border-blue-500 p-1 px-3 rounded-md"
        />

        <label htmlFor="">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-blue-500 p-1 px-3 rounded-md"
        />
        <label htmlFor="">Phone Number</label>
        <input
          type="number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="border border-blue-500 p-1 px-3 rounded-md"
        />
        <label htmlFor="">User Role</label>
        <input
          type="text"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="border border-blue-500 p-1 px-3 rounded-md"
        />
        <label htmlFor="">Status</label>
        <input
          type="text"
          value={isActive}
          onChange={(e) => setIsActive(e.target.value)}
          className="border border-blue-500 p-1 px-3 rounded-md"
        />
        <label htmlFor="">Password</label>
        <input
          type={checkBox ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-blue-500 p-1 px-3 rounded-md"
        />

        <label htmlFor="">Confirm Password</label>
        <input
          type={checkBox ? "text" : "password"}
          value={confirmPw}
          onChange={(e) => setConfirmPw(e.target.value)}
          className="border border-blue-500 p-1 px-3 rounded-md"
        />

        <div className="my-2">
          <input
            type="checkbox"
            value={checkBox}
            onChange={(e) => setCheckBox(e.target.checked)}
            className="border border-blue-500 text-lg mr-1 h-4 w-4"
          />
          <label htmlFor="">Show password</label>
        </div>

        <button
          disabled={
            !(email || phoneNumber) || (password && !(password === confirmPw))
          }
          onClick={handleEditUser}
          className={
            !(email || phoneNumber) || (password && !(password === confirmPw))
              ? "bg-slate-400 text-white rounded-md p-1 m-2"
              : "bg-yellow-500 hover:bg-green-500 text-white rounded-md p-1 m-2 "
          }
        >
          Edit
        </button>
        <button
          onClick={() => setYesNo(true)}
          className={
            "bg-pink-500 hover:bg-red-500 text-white rounded-md p-1 m-2 "
          }
        >
          Delete
        </button>
      </div>
      {yesNo && (
        <DeleteConfirmation
          handleDelete={handleDelete}
          setYesNo={setYesNo}
          navigatePath={"/dash/users"}
        />
      )}
    </form>
  );
};

export default EditUser;
