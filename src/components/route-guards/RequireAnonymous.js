import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../../context/auth/authContext";

function RequireAnonymous({ children }) {
  console.log("in RequireAnonymous");
  const authContext = useContext(AuthContext);
  const { isAuthenticated } = authContext;

  return isAuthenticated ? <Navigate to='/' /> : children;
}
export default RequireAnonymous;
