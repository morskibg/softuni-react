import React, { useContext, useEffect } from "react";
import { useLocation, Navigate } from "react-router-dom";
import Spinner from "../../layout/Spinner";
import AuthContext from "../../../context/auth/authContext";
import AlertContext from "../../../context/alert/alertContext";
import AdminContext from "../../../context/admin/adminContext";

import { Typography, Button } from "@mui/material";
import { Box } from "@mui/system";

import UsersTable from "../../admin/UsersTable";
import "./Users.css";

const Users = (props) => {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);
  const adminContext = useContext(AdminContext);

  const { setAlert } = alertContext;
  const { isAdmin, isGuest, getRole } = authContext;

  const { users, loading, getUsers, setLoader } = adminContext;
  console.log("🚀 ~ file: Home.js ~ line 26 ~ Home ~ users", users);

  useEffect(() => {
    if (authContext.error || adminContext.error) {
      const alert = authContext.error ?? adminContext.error;
      setAlert(alert.msg, alert.type);
      authContext.clearErrors();
      adminContext.clearErrors();
    }
    getRole();
    setLoader();
    getUsers();
    // eslint-disable-next-line
  }, [isAdmin, isGuest, adminContext.error, authContext.error]);

  if (isAdmin) {
    if (loading) {
      return <Spinner />;
    } else {
      return (
        <Box>
          {/* <div style={{ display: "flex", justifyContent: "center" }}></div> */}
          <UsersTable />
        </Box>
      );
    }
  } else {
    return <Navigate to='/login' />;
  }
};

export default Users;
