import React, { useContext, useEffect } from "react";
import { Navigate, Route, useLocation } from "react-router-dom";
import AuthContext from "../../context/auth/authContext";

function RequireGuest({ children }) {
  // console.log("GEEEEEEEEEEEEEEEEEEEEEEEST");
  const authContext = useContext(AuthContext);
  const { isAuthenticated } = authContext;

  if (isAuthenticated) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to='/' />;
  }

  return children;
}
export default RequireGuest;
