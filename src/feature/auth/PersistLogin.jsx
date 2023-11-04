import { Outlet, Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

import { useSelector } from "react-redux";
import { useRefreshMutation } from "./authApiSlice";
import { currentToken } from "./authSlice";

const PersistLogin = () => {
  const token = useSelector(currentToken);

  const [persist] = useState(true);
  const effectRan = useRef(false);
  const [trueSuccess, setTrueSuccess] = useState(false);

  const [refresh, { isUninitialized, isLoading, isSuccess, isError }] =
    useRefreshMutation();

  useEffect(() => {
    if (effectRan.current === true || process.env.NODE_ENV !== "development") {
      // React 18 Strict Mode

      const verifyRefreshToken = async () => {
        // console.log("verifying refresh token");
        try {
          await refresh();
          setTrueSuccess(true);
        } catch (err) {
          console.error(err);
        }
      };

      if (!token && persist) verifyRefreshToken();
    }

    return () => (effectRan.current = true);

    // eslint-disable-next-line
  }, []);

  let content;
  if (!persist) {
    content = <Outlet />;
  } else if (isLoading) {
    content = <p>page is loading....</p>;
  } else if (isError) {
    content = (
      <div className="flex items-center justify-center ">
        <p className="p-5 text-center text-2xl hover:underline-offset-4 hover:underline cursor-pointer">
          {/* {`${error?.data?.message} - `} */}
          <Link to="/login">Your session has expired, login again ?</Link>
        </p>
      </div>
    );
  } else if (isSuccess && trueSuccess) {
    content = <Outlet />;
  } else if (token && isUninitialized) {
    content = <Outlet />;
  }

  return content;
};
export default PersistLogin;
