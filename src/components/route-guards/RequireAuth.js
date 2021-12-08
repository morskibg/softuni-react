import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../../context/auth/authContext";

function RequireAuth({ children }) {
  // console.log("in RequireAuth");
  const authContext = useContext(AuthContext);
  const { isAuthenticated } = authContext;

  if (!isAuthenticated) {
    return <Navigate to='/login' />;
  }

  return children;
}
export default RequireAuth;
