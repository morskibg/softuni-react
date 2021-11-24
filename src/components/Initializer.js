import React, { useContext, useEffect, Fragment } from "react";
import AuthContext from "../context/auth/authContext";
import AdminContext from "../context/admin/adminContext";

const Initializer = () => {
  console.log("entering Initializer");

  const authContext = useContext(AuthContext);
  const adminContext = useContext(AdminContext);
  const { getRole, getUserData } = authContext;

  const { users, clearUsersFromState, loading, getUsers, setLoader } =
    adminContext;
  useEffect(() => {
    getUserData();
    getRole();
  }, []);

  return <Fragment></Fragment>;
};

export default Initializer;
