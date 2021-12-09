import React, { useContext, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Spinner from "../../layout/Spinner";
import AuthContext from "../../../context/auth/authContext";
import AlertContext from "../../../context/alert/alertContext";
import AdminContext from "../../../context/admin/adminContext";

import { Box } from "@mui/system";

import UsersTable from "../../admin/UsersTable";
import "./Users.css";

const Users = (props) => {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);
  const adminContext = useContext(AdminContext);

  const { setAlert } = alertContext;
  const { isAdmin, isGuest, verifyToken, isAuthenticated } = authContext;

  const { users, loading, getUsers, setLoader, currentUser } = adminContext;
  const navigate = useNavigate();

  useEffect(() => {
    if (authContext.error || adminContext.error) {
      const alert = authContext.error ?? adminContext.error;
      setAlert(alert.msg, alert.type);
      authContext.clearErrors();
      adminContext.clearErrors();
    }
    if (!isAuthenticated | isGuest | !isAdmin) {
      navigate("/");
    } else {
      verifyToken();
    }

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

  if (isAdmin) {
    if (loading) {
      return <Spinner />;
    } else {
      return (
        <Box>
          <UsersTable />
        </Box>
      );
    }
  } else {
    return <Navigate to='/login' />;
  }
};

export default Users;
