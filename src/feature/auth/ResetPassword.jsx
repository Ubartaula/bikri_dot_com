import React, { useCallback, useEffect, useState } from "react";
import { usePatchUserMutation } from "../user/userApiSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useOtpVerifyMutation,
  useRestPasswordMutation,
} from "../reset/resetApiSlice";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [showPassWord, setShowPassword] = useState(false);

  const [userEmailVerifyMutation, { isSuccess: isSuccEmail }] =
    usePatchUserMutation();

  const [otpVerificationMutation, { isSuccess: isOTPSuccess }] =
    useOtpVerifyMutation();

  const [resetPasswordMutation, { isSuccess: isResetSuccess }] =
    useRestPasswordMutation();

  const handleEmailVerification = useCallback(async () => {
    try {
      await userEmailVerifyMutation({ email: email }).unwrap();
    } catch (error) {
      console.log(error);
      setErrMsg(error?.data?.message);
    }
  }, [email]);

  const handleOTPVerification = async () => {
    try {
      await otpVerificationMutation({
        resetCode: Number(otp),
        resetTime: Date.now(),
      }).unwrap();
    } catch (error) {
      console.log(error);
      if (error) {
        setErrMsg(error?.data?.message);
      }
    }
  };

  const handleResetPassword = async () => {
    try {
      await resetPasswordMutation({
        resetCode: otp,
        password: password,
      }).unwrap();
    } catch (error) {
      setErrMsg(error?.data?.message);
    }
  };

  useEffect(() => {
    setErrMsg("");
  }, [email, otp]);

  useEffect(() => {
    if (isResetSuccess) {
      toast.success("Password Reset Success", { position: "top-center" });
      navigate("/login");
    }
  }, [isResetSuccess, navigate]);

  const emailCheck = (
    <form onSubmit={(e) => e.preventDefault()}>
      <div className="flex flex-col p-4">
        <div
          aria-live="assertive"
          className="text-red-500 text-lg p-4 text-center"
        >
          {errMsg}
        </div>
        <p className="py-1 font-semibold">
          Enter your email address to reset password
        </p>

        <input
          maxLength={60}
          className="border border-blue-500 p-1 px-2 rounded-sm mb-4 "
          placeholder="email address..."
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          disabled={!email}
          onClick={handleEmailVerification}
          className={`${
            email
              ? "bg-gradient-to-r hover:bg-gradient-to-l from-cyan-500 to-blue-500 text-white p-1 px-2 rounded-md shadow-sm shadow-black"
              : "bg-gray-300 p-1 px-2 rounded-md shadow-sm shadow-black"
          }`}
        >
          Email Submit
        </button>
      </div>
    </form>
  );

  const optCheck = (
    <form onSubmit={(e) => e.preventDefault()}>
      <div className={`flex flex-col p-4`}>
        <p className="py-1 font-semibold">
          We have sent one time password to you email, please check email and
          enter code here
        </p>

        <div
          aria-live="assertive"
          className="text-red-500 text-lg  p-4 text-center"
        >
          {errMsg}
        </div>
        <input
          maxLength={15}
          className="border border-blue-500 p-1 px-2 rounded-sm mb-4 "
          placeholder="enter code..."
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ""))}
        />
        <button
          disabled={!otp}
          onClick={handleOTPVerification}
          className={
            otp
              ? "bg-gradient-to-r hover:bg-gradient-to-l from-cyan-500 to-blue-500 text-white p-1 px-2 rounded-md shadow-sm shadow-black"
              : "bg-gray-400 p-1 px-2 rounded-md shadow-sm shadow-black"
          }
        >
          OTP Submit
        </button>
      </div>
    </form>
  );

  const passWordSet = (
    <form onSubmit={(e) => e.preventDefault()}>
      <div className="p-1">
        <div className="flex flex-col p-3">
          <label htmlFor="">New Password</label>
          <input
            maxLength={15}
            className="border border-blue-500 p-1 rounded-sm"
            placeholder="new password..."
            type={showPassWord ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex flex-col p-3">
          <label htmlFor="">Repeat Password</label>
          <input
            maxLength={15}
            className="border border-blue-500 p-1 rounded-sm"
            placeholder="new password..."
            type={showPassWord ? "text" : "password"}
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
          />
        </div>
        <div className="pl-3 flex flex-row cursor-pointer">
          <input
            type="checkbox"
            value={showPassWord}
            onChange={(e) => setShowPassword(e.target.checked)}
          />
          <p className="ml-1 text-sm font-semibold">Show Password</p>
        </div>
        <div className="p-3">
          <button
            disabled={!(password === repeatPassword)}
            onClick={handleResetPassword}
            className={
              password && repeatPassword && password === repeatPassword
                ? "bg-gradient-to-r hover:bg-gradient-to-l from-cyan-500 to-blue-500 text-white p-1 px-2 rounded-md shadow-sm shadow-black w-full"
                : "bg-slate-500 text-white p-1 px-2 rounded-md shadow-sm shadow-black  w-full"
            }
          >
            Reset
          </button>
        </div>
      </div>
    </form>
  );

  return (
    <div className=" mx-auto w-full max-w-xl">
      {isOTPSuccess && isSuccEmail
        ? passWordSet
        : isSuccEmail
        ? optCheck
        : emailCheck}
    </div>
  );
};

export default ResetPassword;
