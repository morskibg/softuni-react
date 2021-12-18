import React, { useContext } from "react";
import { Navigate } from "react-router-dom";

import AuthContext from "../context/auth/authContext";

const isLogedHoc = (Component) => {
  const Wrapper = (props) => {
    const authContext = useContext(AuthContext);
    const { isAdmin, isAuthenticated, isGuest, setAuthAlert } = authContext;
    console.log("innn isLogedHoc", isAdmin, isAuthenticated, isGuest);
    // setAuthAlert("Admin only !", "danger");
    if (isAdmin || isAuthenticated || isGuest) {
      return <Component {...props} />;
    } else {
      //   setAuthAlert("Admin only !", "danger");
      return <Navigate to='/login' />;
    }

    // return hasAdminPermission ? (
    //   <Component {...props} />
    // ) : (
    //   <Navigate to={"/"} />
    // );
  };
  return Wrapper;
};

export default isLogedHoc;
