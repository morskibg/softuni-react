import React, { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import Spinner from "../layout/Spinner";
import AuthContext from "../../context/auth/authContext";
import AlertContext from "../../context/alert/alertContext";
import AdminContext from "../../context/admin/adminContext";
import UserContext from "../../context/user/userContext";

import "./Home.css";

const Home = (props) => {
  console.log("entering HOME");
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);
  const adminContext = useContext(AdminContext);
  const userContext = useContext(UserContext);

  const { setAlert } = alertContext;
  const { isAuthenticated, isAdmin, isGuest } = authContext;

  const { loading } = adminContext;

  useEffect(() => {
    console.log("in HOME use effect");
    if (authContext.error || adminContext.error || userContext.error) {
      const alert =
        authContext.error ?? adminContext.error ?? userContext.error;
      // console.log("🚀 ~ file: Home.js ~ line 33 ~ useEffect ~ alert", alert);

      setAlert(alert.msg, alert.type);
      authContext.clearErrors();
      adminContext.clearErrors();
      userContext.clearErrors();
    }
    // eslint-disable-next-line
  }, [
    isAdmin,
    isGuest,
    adminContext.error,
    authContext.error,
    userContext.error,
  ]);

  if (isAuthenticated) {
    if (loading) {
      return <Spinner />;
    } else {
      return (
        <div className='with-drawer'>
          <div style={{ display: "flex", justifyContent: "center" }}></div>
        </div>
      );
    }
  } else {
    return <Navigate to='/login' />;
  }
};

export default Home;
