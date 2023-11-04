import React, { useEffect, useState } from "react";
import { useSendLoginMutation } from "./authApiSlice";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setToken } from "./authSlice";
import { useAddUserMutation } from "../user/userApiSlice";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [accountOption, setAccountOption] = useState("login");
  const [showPassword, setShowPassword] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // handling login
  const [loginMutation, { isSuccess }] = useSendLoginMutation();
  const handleLogin = async () => {
    try {
      const { accessToken } = await loginMutation({
        email,
        phoneNumber,
        password,
      }).unwrap();

      dispatch(setToken({ accessToken }));
    } catch (error) {
      if (error) {
        setErrMsg(
          error?.data?.message ||
            error?.code ||
            error?.message ||
            error?.data ||
            error?.error ||
            error?.name ||
            error?.originalStatus ||
            error?.stack ||
            error?.status
        );
      }
      console.log(error);
    }
  };

  useEffect(() => {
    setErrMsg("");
  }, [email, phoneNumber, password]);

  useEffect(() => {
    if (isSuccess) {
      navigate("/dash");
    }
  }, [isSuccess, navigate]);

  // end of login

  // capturing longitude and latitude
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords = position.coords;
          setLatitude(coords.latitude);
          setLongitude(coords.longitude);
        },
        (err) => {
          console.error(err);
        }
      );
    } else {
      console.error("your browser do not support geolocation");
    }
  }, []);
  // END OF  capturing longitude and latitude

  // handling create new user account

  const [addNewUserMutation, { isSuccess: isSuccessAddNewUser }] =
    useAddUserMutation();

  const handleCreateAccount = async () => {
    try {
      await addNewUserMutation({
        firstName,
        lastName,
        email: email,
        phoneNumber: phoneNumber,
        password: password,
        lat: latitude,
        lng: longitude,
      }).unwrap();
    } catch (error) {
      if (error) {
        setErrMsg(
          error?.data?.message ||
            error?.code ||
            error?.message ||
            error?.data ||
            error?.error ||
            error?.name ||
            error?.originalStatus ||
            error?.stack ||
            error?.status
        );
      }
      console.log(error);
    }
  };

  useEffect(() => {
    if (isSuccessAddNewUser) {
      toast.success("Successfully created account.");
    }
  }, [isSuccessAddNewUser]);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const emailCheck = emailRegex.test(email);

  return (
    <>
      <div className="min-h-[2rem]"></div>
      {!isSuccessAddNewUser ? (
        <div className=" min-w-full min-h-screen mx-auto sm:min-w-[50%] sm:max-w-[50%] bg-gray-50 text-black  rounded-lg">
          <div className="bg-sky-400 text-white h-[3rem] flex flex-row items-center justify-evenly font-semibold  ">
            <p
              onClick={() => setAccountOption("login")}
              className={`${
                accountOption === "login"
                  ? "bg-gray-50 text-black px-4 h-full flex items-center "
                  : "bg-blue-800 text-white shadow-sm shadow-blue-800 px-4 p-1 rounded-md hover:bg-pink-500"
              } cursor-pointer min-w-[8rem] text-center   `}
            >
              Login
            </p>
            <p
              onClick={() => setAccountOption("create")}
              className={`${
                accountOption === "create"
                  ? "bg-gray-50 text-black px-4 h-full flex items-center  "
                  : "bg-blue-800 text-white shadow-sm shadow-blue-800 px-4 p-1 rounded-md hover:bg-pink-500"
              } cursor-pointer min-w-[8rem] text-center`}
            >
              Create Account
            </p>
          </div>

          <form onSubmit={(e) => e.preventDefault()} className="p-4 m-3">
            <div
              aria-live="assertive"
              className="text-red-600 text-xl px-2 pt-2"
            >
              {errMsg}
            </div>

            {accountOption === "create" && (
              <>
                <div className="flex flex-col p-2">
                  <label htmlFor="" className="">
                    Fist Name
                  </label>
                  <input
                    maxLength={20}
                    required
                    placeholder="first name...."
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="border border-blue-500 p-1 px-2 rounded-lg"
                  />
                </div>
                <div className="flex flex-col p-2">
                  <label htmlFor="" className="">
                    Last Name
                  </label>
                  <input
                    maxLength={20}
                    required
                    placeholder="last name...."
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="border border-blue-500 p-1 px-2 rounded-lg"
                  />
                </div>{" "}
              </>
            )}
            <div className="flex flex-col p-2">
              <label htmlFor="" className="">
                Email
              </label>
              <input
                maxLength={30}
                placeholder="email address..."
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border border-blue-500 p-1 px-2 rounded-lg"
              />
            </div>
            {accountOption === "login" && (
              <div className="flex flex-row items-center p-2 pt-0 pb-0 ">
                <hr className=" bg-black h-0.5 w-full ml-3" />
                <p className="px-2 text-2xl">or</p>
                <hr className=" bg-black h-0.5 w-full mr-3" />
              </div>
            )}
            <div className="flex flex-col mb-2 p-2 pt-0">
              <label htmlFor="">Mobile Number</label>
              {accountOption === "create" && (
                <span className="text-xs italic">optional </span>
              )}
              <input
                placeholder="mobile number..."
                type="text"
                maxLength={40}
                value={phoneNumber}
                onChange={(e) =>
                  setPhoneNumber(e.target.value.replace(/[^0-9]/g, ""))
                }
                className="border border-blue-500 p-1 px-2 rounded-lg"
              />
            </div>
            <div className="flex flex-col mb-2 p-2">
              <label htmlFor="">Password </label>
              {accountOption === "create" && (
                <span className="text-xs italic whitespace-nowrap text-ellipsis overflow-hidden">
                  minimum 4 character required
                </span>
              )}
              <input
                required
                minLength={4}
                maxLength={15}
                placeholder="password..."
                type={`${showPassword ? "text" : "password"}`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border border-blue-500 p-1 px-2 rounded-lg"
              />
            </div>
            {accountOption === "create" && (
              <div className="flex flex-col p-2">
                <label htmlFor="">Confirm Password</label>
                <input
                  maxLength={15}
                  placeholder="repeat password..."
                  type={`${showPassword ? "text" : "password"}`}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="border border-blue-500 p-1 px-2 rounded-lg"
                />
              </div>
            )}

            <div className="flex flex-row items-center justify-between mb-4">
              <div className="flex flex-row items-center px-4 cursor-pointer">
                <input
                  type="checkbox"
                  value={showPassword}
                  onChange={() => setShowPassword((prev) => !prev)}
                />
                <p className="ml-1 text-sm font-semibold ">Show password</p>
              </div>
              <Link
                to={"/reset"}
                className="text-end text-sm font-semibold pr-6 text-blue-900 hover:text-green-900"
              >
                Forgot Password ?
              </Link>
            </div>

            <div className="flex flex-col items-center my-6 p-2">
              {accountOption === "login" && (
                <button
                  onClick={() => {
                    if (!(email || phoneNumber)) {
                      setErrMsg("Email or Phone number required ");
                    } else if ((email || phoneNumber) && !password) {
                      setErrMsg("Provide password");
                    } else if ((email || phoneNumber) && password) {
                      handleLogin();
                    }
                  }}
                  className="bg-blue-600 text-white hover:bg-green-600 p-1 rounded-lg w-[50%]"
                >
                  Sign in
                </button>
              )}
              {accountOption === "create" && (
                <button
                  onClick={() => {
                    if (!firstName) {
                      setErrMsg("First name required");
                    } else if (!lastName) {
                      setErrMsg("Last name required");
                    } else if (!(email && emailCheck)) {
                      setErrMsg("Email required");
                    } else if (!password) {
                      setErrMsg("Password field is empty");
                    } else if (password && password?.length < 4) {
                      setErrMsg("Password needs 4 or longer character");
                    } else if (!(password === confirmPassword)) {
                      setErrMsg("Repeat password did not match");
                    } else if (
                      emailCheck &&
                      firstName &&
                      lastName &&
                      password &&
                      password === confirmPassword
                    )
                      handleCreateAccount();
                  }}
                  // disabled={
                  //   !(email || phoneNumber) ||
                  //   !password ||
                  //   !(password?.length >= 4) ||
                  //   !confirmPassword ||
                  //   !(password === confirmPassword)
                  // }
                  className="bg-blue-600 text-white hover:bg-green-600 p-1 rounded-lg w-[50%]"
                >
                  Create Account
                </button>
              )}
            </div>
          </form>
        </div>
      ) : (
        <div className="h-[100vh] w-screen flex flex-col justify-center items-center bg-slate-300 bg-transparent">
          <p className="font-semibold p-4">Do you want to login ?</p>
          <div className="flex flex-row items-center justify-center p-2">
            <button
              onClick={handleLogin}
              className="bg-blue-600 min-w-[4rem] mr-2 text-white p-1 px-3 rounded-md border border-gray-400 hover:bg-green-600"
            >
              Yes
            </button>
            <button
              onClick={() => navigate("/")}
              className="bg-blue-600 min-w-[4rem] text-white p-1 px-3 rounded-md border border-gray-400 hover:bg-red-600"
            >
              No
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
