import React, { Fragment, useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Redirect,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import AuthState from "./context/auth/AuthState";
import AlertState from "./context/alert/AlertState";
import Navbar from "./components/layout/Navbar_old";
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
