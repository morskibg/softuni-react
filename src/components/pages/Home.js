import React, { useState, useContext, useEffect, Fragment } from "react";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import AuthContext from "../../context/auth/authContext";
import AlertContext from "../../context/alert/alertContext";
import ThemeContext from "../../context/theme/themeContext";
import { Typography } from "@mui/material";

const Home = () => {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);
  const themeContext = useContext(ThemeContext);

  const { setAlert } = alertContext;
  const { isAuthenticated } = authContext;
  // const { setDark, setLight } = themeContext;
  const clickButton = (e) => {
    console.log(e);
    // setDark();
  };

  if (isAuthenticated) {
    return (
      <Fragment>
        <Typography variant='h1'>Hello from Home</Typography>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button className='btn btn-light btn-block' onClick={clickButton}>
            Test
          </button>
        </div>
      </Fragment>
    );
  } else {
    return <Navigate to='/login' />;
  }
};

export default Home;
