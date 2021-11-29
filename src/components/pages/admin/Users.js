import React, { useContext, useEffect, useState } from "react";
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

  const { users, loading, getUsers, setLoader, currentUser } = adminContext;

  // console.log("🚀 ~ file: Users.js ~ line 23 ~ Users ~ isModified", isModified);

  useEffect(() => {
    console.log("Users UEFF");
    if (authContext.error || adminContext.error) {
      const alert = authContext.error ?? adminContext.error;
      setAlert(alert.msg, alert.type);
      authContext.clearErrors();
      adminContext.clearErrors();
    }
    // getRole();
    // clearModifier();
    if (users.length === 0) {
      setLoader();
      getUsers();
    }

    // eslint-disable-next-line
  }, [
    isAdmin,
    isGuest,
    adminContext.error,
    authContext.error,
    users,
    currentUser,
  ]);

  const [reload, setReload] = useState(false);

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
