import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../../context/auth/authContext";

function RequireNotGuest({ children }) {
  // console.log("in RequireNotGuest");
  const authContext = useContext(AuthContext);
  const { isGuest, isAuthenticated } = authContext;

  return isGuest || !isAuthenticated ? <Navigate to='/' /> : children;
}
export default RequireNotGuest;
