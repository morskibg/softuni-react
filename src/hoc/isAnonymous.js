import React, { useContext } from "react";
import { Navigate } from "react-router-dom";

import AuthContext from "../context/auth/authContext";

const isAnonymousHoc = (Component) => {
  const Wrapper = (props) => {
    const authContext = useContext(AuthContext);
    const { isAuthenticated, isGuest, setAuthAlert } = authContext;
    console.log("in aninymos hoc", isAuthenticated, isGuest);
    if (!isAuthenticated && !isGuest) {
      return <Component {...props} />;
    } else {
      return <Navigate to='/' />;
    }
  };
  return Wrapper;
};

export default isAnonymousHoc;
