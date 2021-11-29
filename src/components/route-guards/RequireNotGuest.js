import React, { useContext, useEffect } from "react";
import { Navigate, Route, useLocation } from "react-router-dom";
import AuthContext from "../../context/auth/authContext";

function RequireNotGuest({ children }) {
  console.log("in RequireNotGuest");
  const authContext = useContext(AuthContext);
  const { isGuest, isAuthenticated } = authContext;

  // if (isGuest || !isAuthenticated) {
  //   return <Navigate to='/' />;
  // } else {
  //   console.log("should be here !!!!");
  //   return children;
  // }

  return isGuest || !isAuthenticated ? <Navigate to='/' /> : children;
}
export default RequireNotGuest;
