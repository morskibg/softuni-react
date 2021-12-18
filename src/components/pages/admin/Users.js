import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "../../layout/Spinner";
import AuthContext from "../../../context/auth/authContext";
import AlertContext from "../../../context/alert/alertContext";
import AdminContext from "../../../context/admin/adminContext";
import useAdminGuard from "../../../hooks/useAdminGuard";

import { Box } from "@mui/system";

import UsersTable from "../../admin/UsersTable";
import isAdminHoc from "../../../hoc/isAdmin";
import "./Users.css";

const Users = (props) => {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);
  const adminContext = useContext(AdminContext);

  const { setAlert } = alertContext;

  const hasAdminPermission = useAdminGuard();

  const { users, loading, getUsers, setLoader, currentUser } = adminContext;
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (!hasAdminPermission) {
  //     navigate("/");
  //   }
  //   // eslint-disable-next-line
  // }, [hasAdminPermission]);

  useEffect(() => {
    console.log("in useeers");
    if (authContext.error || adminContext.error) {
      const alert = authContext.error ?? adminContext.error;
      setAlert(alert.msg, alert.type);
      authContext.clearErrors();
      adminContext.clearErrors();
    }

    if (users.length === 0) {
      // console.log("from user use effect");
      setLoader();
      getUsers();
    }

    // eslint-disable-next-line
  }, [adminContext.error, authContext.error, users, currentUser]);

  if (loading) {
    return <Spinner />;
  } else {
    return (
      <Box>
        <UsersTable />
      </Box>
    );
  }
};

export default isAdminHoc(Users);
// export default Users;
