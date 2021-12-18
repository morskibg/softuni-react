import React, { useContext } from "react";
import { Navigate } from "react-router-dom";

import AuthContext from "../context/auth/authContext";

const isNotGuestHoc = (Component) => {
  const Wrapper = (props) => {
    const authContext = useContext(AuthContext);
    const { isAuthenticated, isGuest } = authContext;

    if (isAuthenticated && !isGuest) {
      return <Component {...props} />;
    } else {
      return <Navigate to='/' />;
    }
  };
  return Wrapper;
};

export default isNotGuestHoc;
