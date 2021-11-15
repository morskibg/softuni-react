import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import AuthContext from "../../context/auth/authContext";
import AlertContext from "../../context/alert/alertContext";
import { Typography } from "@mui/material";

const Home = () => {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);

  const { setAlert } = alertContext;
  const { isAuthenticated } = authContext;
  if (isAuthenticated) {
    return <Typography variant='h1'>Hello from Home</Typography>;
  } else {
    return <Navigate to='/login' />;
  }
};

export default Home;
