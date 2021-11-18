import React, { useState, useContext, useEffect, Fragment } from "react";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import AuthContext from "../../context/auth/authContext";
import AlertContext from "../../context/alert/alertContext";
import AdminContext from "../../context/admin/adminContext";
import ThemeContext from "../../context/theme/themeContext";
import { Typography, Button } from "@mui/material";
import { Box } from "@mui/system";

import DarkModeIcon from "@mui/icons-material/Brightness4";
import LightModeIcon from "@mui/icons-material/Brightness7";

import DataTable from "../layout/Table";

const Home = () => {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);
  const adminContext = useContext(AdminContext);
  const themeContext = useContext(ThemeContext);

  const { setAlert } = alertContext;
  const { error, clearErrors, isAuthenticated, isAdmin, isGuest, getRole } =
    authContext;
  const { toggle, themeMode } = themeContext;
  const { users } = adminContext;
  console.log("🚀 ~ file: Home.js ~ line 26 ~ Home ~ users", users);

  useEffect(() => {
    if (error) {
      setAlert(error, "danger");
      clearErrors();
    }
    // console.log("in home use efect");
    getRole();
    // eslint-disable-next-line
  }, [isAdmin, isGuest]);

  const clickButton = (e) => {
    toggle();
  };

  if (isAuthenticated) {
    // console.log("in home autenticated", isGuest);
    return (
      <div className='withDrawer'>
        <Typography variant='h1'>Hello from Home</Typography>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button
            type='submit'
            variant='contained'
            endIcon={themeMode ? <LightModeIcon /> : <DarkModeIcon />}
            // color={checked ? "error" : "primary"}
            onClick={clickButton}
          >
            {themeMode ? " go light " : "go night"}
          </Button>

          <div>
            <Typography>{isAdmin && "Logged as Admin"}</Typography>
            <Typography>{isGuest && "Logged as Guest"}</Typography>
          </div>
        </div>
        {users.length > 0 && <DataTable />}
      </div>
    );
  } else {
    return <Navigate to='/login' />;
  }
};

export default Home;
