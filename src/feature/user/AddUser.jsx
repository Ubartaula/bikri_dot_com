import React, { useEffect, useState } from "react";
import { useAddUserMutation } from "./userApiSlice";
import { useNavigate } from "react-router-dom";

const AddUser = () => {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [checkBox, setCheckBox] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  // working with lat and lng

  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  useEffect(() => {
    // Check if Geolocation API is available in the browser
    if ("geolocation" in navigator) {
      // Get user's current position
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLatitude(latitude);
          setLongitude(longitude);
        },
        (error) => {
          console.error("Error getting user location:", error.message);
        }
      );
    } else {
      console.error("Geolocation is not available in this browser.");
    }
  }, []);
  ///

  const [addUserMutation, { isSuccess }] = useAddUserMutation();
  const handleCreateUser = async () => {
    // to address default role
    const newRole = role ? role : "Customer";
    try {
      await addUserMutation({
        firstName,
        lastName,
        email,
        phoneNumber,
        password,
        role: newRole,
        lat: latitude,
        lng: longitude,
      }).unwrap();
    } catch (error) {
      setErrMsg(error?.data?.message);
      console.log(error);
    }
  };

  useEffect(() => {
    setErrMsg("");
  }, [password, confirmPw, firstName, lastName, email, phoneNumber]);

  useEffect(() => {
    if (isSuccess) {
      navigate("/dash/users");
    }
  }, [isSuccess, navigate]);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const emailCheck = emailRegex.test(email);

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="m-auto w-full max-w-lg"
    >
      <div className="flex flex-col p-4 sm:p-8 bg-slate-100">
        <div
          className="min-h-[2rem] text-center italic text-red-600"
          aria-live="assertive"
        >
          {errMsg}
        </div>
        <h2 className="py-2 text-center font-bold">Create New User</h2>

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
          onClick={() => {
            if (!email) {
              setErrMsg("Need to provide email address");
            } else if (email && !emailCheck) {
              setErrMsg("Provided email address is not valid");
            } else if (!firstName) {
              setErrMsg("Need to provide First Name of user");
            } else if (!lastName) {
              setErrMsg("Need to provide Last Name of user");
            } else if (!password) {
              setErrMsg("Password field is empty");
            } else if (password && !(password === confirmPw)) {
              setErrMsg("Repeat password did not match");
            } else if (
              firstName &&
              lastName &&
              email &&
              password &&
              password === confirmPw
            ) {
              handleCreateUser();
            }
          }}
          className="bg-blue-600 hover:bg-green-600 text-white p-1 mx-auto w-[50%] rounded-lg"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default AddUser;
