import React from "react";
import useToken from "../../hooks/useToken";
import { Navigate, Outlet, useLocation } from "react-router-dom";
const RequireAuth = ({ authRole }) => {
  const location = useLocation();
  const {  role } = useToken();

  if (authRole.includes(role)) {
    return <Outlet />;
  } else {
    return <Navigate to={"/login"} state={{ from: location }} replace />;
  }
};

export default RequireAuth;
