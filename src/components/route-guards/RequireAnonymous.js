import React, { useContext, useEffect } from "react";
import { Navigate, Route, useLocation } from "react-router-dom";
import AuthContext from "../../context/auth/authContext";

function RequireAnonymous({ children }) {
  console.log("in RequireAnonymous");
  const authContext = useContext(AuthContext);
  const { isAuthenticated } = authContext;

  return isAuthenticated ? <Navigate to='/' /> : children;
}
export default RequireAnonymous;
