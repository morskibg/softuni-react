import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../../context/auth/authContext";

function RequireAdmin({ children }) {
  const authContext = useContext(AuthContext);
  const { isAdmin, setAuthAlert } = authContext;
  console.log("in RequireAdmin", isAdmin);
  if (!isAdmin) {
    setAuthAlert("Admin only !", "danger");
    return <Navigate to='/' />;
  } else {
    return children;
  }
}
export default RequireAdmin;
