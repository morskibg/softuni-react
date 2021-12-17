import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../../context/auth/authContext";

function RequireAnonymous({ children }) {
  const authContext = useContext(AuthContext);
  const { isAuthenticated } = authContext;
  console.log("in RequireAnonymous", isAuthenticated);

  return isAuthenticated ? <Navigate to='/' /> : children;
}
export default RequireAnonymous;
