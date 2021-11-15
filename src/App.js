import React, { Fragment, useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthState from "./context/auth/AuthState";
import AlertState from "./context/alert/AlertState";

import Header from "./components/layout/Navdrawer";

// import "./App.css";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Alerts from "./components/layout/Alerts";
import Logout from "./components/auth/Logout";
import RequireAuth from "./components/route-guards/RequireAuth";
import RequireGuest from "./components/route-guards/RequireGuest";
import Home from "./components/pages/Home";

import { Container } from "@mui/material";

// import { createTheme } from "@mui/material/styles";
// import { ThemeProvider } from "@mui/material";
// import CssBaseline from "@mui/material/CssBaseline";

// const theme = createTheme({
//   palette: {
//     primary: {
//       light: "#757ce8",
//       main: "#fefefe",
//       dark: "#002884",
//       contrastText: "#fff",
//     },
//     secondary: {
//       light: "#ff7961",
//       main: "#f44336",
//       dark: "#ba000d",
//       contrastText: "#000",
//     },
//   },
// });

const App = () => {
  return (
    <AuthState>
      <AlertState>
        <Router>
          <Fragment>
            <Container />

            <Header />
            {/* <Navbar /> */}

            <Alerts />

            <Routes>
              <Route path='/' element={<Home />} />
              <Route
                path='/register'
                element={
                  <RequireGuest>
                    <Register />
                  </RequireGuest>
                }
              />
              <Route
                path='/login'
                element={
                  <RequireGuest>
                    <Login />
                  </RequireGuest>
                }
              />
              <Route
                path='/logout'
                element={
                  <RequireAuth>
                    <Logout />
                  </RequireAuth>
                }
              />
            </Routes>
          </Fragment>
        </Router>
      </AlertState>
    </AuthState>
  );
};

export default App;
