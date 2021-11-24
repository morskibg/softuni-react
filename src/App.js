import React, { Fragment, useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Container } from "@mui/material/";

import AuthState from "./context/auth/AuthState";
import AlertState from "./context/alert/AlertState";
import AdminState from "./context/admin/AdminState";

import Header from "./components/layout/Navdrawer";
import "./App.css";
import Login from "./components/pages/auth/Login";
import Register from "./components/pages/admin/Register";
import Alerts from "./components/layout/Alerts";
import Initializer from "./components/Initializer";
import Logout from "./components/pages/auth/Logout";
import RequireAuth from "./components/route-guards/RequireAuth";
import RequireGuest from "./components/route-guards/RequireGuest";
import RequireAdmin from "./components/route-guards/RequireAdmin";
import Home from "./components/pages/Home";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { darkTheme, lightTheme } from "./components/layout/Theme";

import ThemeContext from "./context/theme/themeContext";
import Users from "./components/pages/admin/Users";

const App = () => {
  const themeToLoad =
    useContext(ThemeContext).themeMode === "dark" ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={themeToLoad}>
      <CssBaseline />
      <AuthState>
        <AlertState>
          <AdminState>
            <Router>
              <Fragment>
                <Container />
                <Header />
                <Alerts />
                <Routes>
                  <Route path='/' element={<Home />} />
                  <Route
                    path='admin/register'
                    element={
                      <RequireAdmin>
                        <Register />
                      </RequireAdmin>
                    }
                  />
                  <Route
                    path='admin/users'
                    element={
                      <RequireAdmin>
                        <Users />
                      </RequireAdmin>
                    }
                  />
                  <Route
                    path='login'
                    element={
                      <RequireGuest>
                        <Login />
                      </RequireGuest>
                    }
                  />
                  <Route
                    path='logout'
                    element={
                      <RequireAuth>
                        <Logout />
                      </RequireAuth>
                    }
                  />
                </Routes>
              </Fragment>
            </Router>
          </AdminState>
        </AlertState>
      </AuthState>
    </ThemeProvider>
  );
};

export default App;
