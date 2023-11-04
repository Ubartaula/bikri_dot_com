import React, { useEffect, useState } from "react";
import { useEditUserMutation, useGetUsersQuery } from "./userApiSlice";
import { useNavigate } from "react-router-dom";
import useToken from "../../hooks/useToken";

const UserSetting = () => {
  const { userId: id } = useToken();
  const navigate = useNavigate();
  const { user } = useGetUsersQuery("listUsers", {
    selectFromResult: ({ data }) => ({
      user: data?.entities[id],
    }),
  });

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [checkBox, setCheckBox] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const [editUserMutation, { isSuccess }] = useEditUserMutation();

  const handleEditUser = async () => {
    try {
      await editUserMutation({
        id: id,
        firstName,
        lastName,
        email,
        phoneNumber,
        password,
        // role,
        // isActive,
      }).unwrap();
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
    setErrMsg("");
  }, [firstName, lastName, email, phoneNumber, password, confirmPw]);

  useEffect(() => {
    if (isSuccess) {
      navigate("/dash/profile");
    }
  }, [isSuccess, navigate]);

  // handle Delete

  //   const handleDelete = async () => {
  //     try {
  //       await deleteUserMutation({ id: user?.id });
  //       setYesNo(false);
  //     } catch (error) {
  //       setErrMsg(error?.data?.message);
  //       console.log(error);
  //     }
  //   };

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="m-auto w-[100vw] max-w-lg p-2 "
    >
      <div className="flex flex-col p-4 m-4 bg-slate-100 rounded-md max-w-lg ">
        <h2 className="py-2 text-center font-bold">Edit User Form</h2>
        <div
          className="min-h-[2rem] text-red-600 text-center text-lg"
          aria-live="assertive"
        >
          {errMsg}
        </div>
        <label htmlFor="" className="pl-4">
          Fist Name
        </label>
        <input
          type="text"
          value={firstName}
          placeholder={user?.firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="border m-2 mx-4 border-blue-500 p-1 px-3 rounded-md"
        />
        <label htmlFor="" className="pl-4">
          Last Name
        </label>
        <input
          type="text"
          value={lastName}
          placeholder={user?.lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="border m-2 mx-4 border-blue-500 p-1 px-3 rounded-md"
        />

        <label htmlFor="" className="pl-4">
          Email
        </label>
        <input
          type="email"
          value={email}
          placeholder={user?.email}
          onChange={(e) => setEmail(e.target.value)}
          className="border m-2 mx-4 border-blue-500 p-1 px-3 rounded-md"
        />
        <label htmlFor="" className="pl-4">
          Phone Number
        </label>
        <input
          type="number"
          value={phoneNumber}
          placeholder={user?.phoneNumber?.toString()}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="border m-2 mx-4 border-blue-500 p-1 px-3 rounded-md"
        />

        <label htmlFor="" className="pl-4">
          Password
        </label>
        <input
          type={checkBox ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border m-2 mx-4 border-blue-500 p-1 px-3 rounded-md"
        />

        <label htmlFor="" className="pl-4">
          Confirm Password
        </label>
        <input
          type={checkBox ? "text" : "password"}
          value={confirmPw}
          onChange={(e) => setConfirmPw(e.target.value)}
          className="border m-2 mx-4 border-blue-500 p-1 px-3 rounded-md"
        />

        <div className="my-2 pl-4">
          <input
            type="checkbox"
            value={checkBox}
            onChange={(e) => setCheckBox(e.target.checked)}
            className="border border-blue-500 text-lg mr-1 h-4 w-4"
          />
          <label htmlFor="">Show password</label>
        </div>

        <button
          onClick={() => {
            if (
              !(
                firstName ||
                lastName ||
                email ||
                phoneNumber ||
                password ||
                (password && password === confirmPw)
              )
            ) {
              setErrMsg("No change has made");
            } else if (password && password !== confirmPw) {
              setErrMsg("Repeat password did not match");
            } else {
              handleEditUser();
            }
          }}
          className="bg-blue-600 text-white p-2 mx-4 rounded-lg hover:bg-green-600"
        >
          Edit
        </button>
      </div>
    </form>
  );
};

export default UserSetting;
