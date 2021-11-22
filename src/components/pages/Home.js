import React, { useState, useContext, useEffect, Fragment } from "react";
import {
  useNavigate,
  useLocation,
  Navigate,
  Routes,
  Route,
} from "react-router-dom";
import Spinner from "../layout/Spinner";
import AuthContext from "../../context/auth/authContext";
import AlertContext from "../../context/alert/alertContext";
import AdminContext from "../../context/admin/adminContext";
// import ThemeContext from "../../context/theme/themeContext";
// import { Typography, Button } from "@mui/material";
// import { Box } from "@mui/system";

// import DarkModeIcon from "@mui/icons-material/Brightness4";
// import LightModeIcon from "@mui/icons-material/Brightness7";

// import DataTable from "../layout/UsersTable";
import "./Home.css";

const Home = (props) => {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);
  const adminContext = useContext(AdminContext);

  const { setAlert } = alertContext;
  const { isAuthenticated, isAdmin, isGuest, getRole } = authContext;

  const { users, clearUsersFromState, loading, getUsers, setLoader } =
    adminContext;
  console.log("🚀 ~ file: Home.js ~ line 26 ~ Home ~ users", users);

  useEffect(() => {
    if (authContext.error || adminContext.error) {
      // console.log(
      //   "🚀 ~ file: Home.js ~ line 30 ~ useEffect ~ adminContext.error",
      //   adminContext.error
      // );
      // console.log(
      //   "🚀 ~ file: Home.js ~ line 30 ~ useEffect ~ authContext.error",
      //   authContext.error
      // );
      const alert = authContext.error ?? adminContext.error;
      // console.log("🚀 ~ file: Home.js ~ line 33 ~ useEffect ~ alert", alert);

      setAlert(alert.msg, alert.type);
      authContext.clearErrors();
      adminContext.clearErrors();
    }
    getRole();

    // eslint-disable-next-line
  }, [isAdmin, isGuest, adminContext.error, authContext.error]);

  // const alertUser = (e) => {
  //   e.preventDefault();
  //   e.returnValue = "";
  //   console.log("fired"); //console.log is present on F5, not when leaving the page
  // };

  // useEffect(() => {
  //   console.log("kokoko");
  //   window.addEventListener("beforeunload", alertUser);
  //   return () => {
  //     window.removeEventListener("beforeunload", alertUser);
  //   };
  // }, []);

  // const location = useLocation();

  // useEffect(() => {
  //   console.log("Location changed", location);
  //   if (location.pathname === "/admin/users") {
  //     setLoader();
  //     getUsers();
  //   } else {
  //     clearUsersFromState();
  //   }
  // }, [location]);

  // useEffect(() => {
  //   console.log("Location changed", location);
  //   if (users.length > 0) {
  //     clearUsersFromState();
  //   }
  // }, [location]);

  if (isAuthenticated) {
    console.log("in home in is Auth - checking for loading", loading);
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
