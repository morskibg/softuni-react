import React, { useState, useContext, useEffect, Fragment } from "react";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import AuthContext from "../../context/auth/authContext";
import AlertContext from "../../context/alert/alertContext";
import ThemeContext from "../../context/theme/themeContext";
import { Typography, Button } from "@mui/material";

import DarkModeIcon from "@mui/icons-material/Brightness4";
import LightModeIcon from "@mui/icons-material/Brightness7";

const Home = () => {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);
  const themeContext = useContext(ThemeContext);

  const { setAlert } = alertContext;
  const { isAuthenticated, isAdmin } = authContext;
  const { toggle, isDark } = themeContext;
  const clickButton = (e) => {
    console.log(e);
    toggle();
  };
  console.log(isAdmin);

  if (isAuthenticated) {
    return (
      <div>
        <Typography variant='h1'>Hello from Home</Typography>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button
            type='submit'
            variant='contained'
            endIcon={isDark ? <LightModeIcon /> : <DarkModeIcon />}
            // color={checked ? "error" : "primary"}
            onClick={clickButton}
          >
            {isDark ? " go light " : "go night"}
          </Button>
          {/* <button


            className='btn btn-light btn-block'
            onClick={clickButton}
            endIcon={isDark ? <LightModeIcon /> : <DarkModeIcon />}
          >
            Test
          </button> */}
          <Typography>{isAdmin ? "ADMINNNNN" : "izaura"}</Typography>
        </div>
      </div>
    );
  } else {
    return <Navigate to='/login' />;
  }
};

export default Home;
