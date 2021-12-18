import React, { useContext } from "react";
import { Navigate } from "react-router-dom";

import useAdminGuard from "../hooks/useAdminGuard";
import AuthContext from "../context/auth/authContext";

const isAdminHoc = (Component) => {
  const Wrapper = (props) => {
    const hasAdminPermission = useAdminGuard();
    const authContext = useContext(AuthContext);
    const { setAuthAlert } = authContext;

    if (hasAdminPermission) {
      return <Component {...props} />;
    } else {
      setAuthAlert("Admin only !!!!", "danger");
      return <Navigate to='/' />;
    }
  };
  return Wrapper;
};

export default isAdminHoc;
