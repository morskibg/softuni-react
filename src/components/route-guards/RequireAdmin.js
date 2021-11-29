import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../../context/auth/authContext";

function RequireAdmin({ children }) {
  console.log("in RequireAdmin");
  const authContext = useContext(AuthContext);
  const { isAdmin } = authContext;

  return isAdmin ? children : <Navigate to='/' />;

  // if (!isAdmin) {
  //   return <Navigate to='/' />;
  // }

  // return children;
}
export default RequireAdmin;
