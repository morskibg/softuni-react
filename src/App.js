import React, { Fragment, useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container } from "@mui/material/";

import AuthState from "./context/auth/AuthState";
import AlertState from "./context/alert/AlertState";
import AdminState from "./context/admin/AdminState";
import UserState from "./context/user/UserState";

import Header from "./components/layout/Navdrawer";
import "./App.css";
import Login from "./components/pages/auth/Login";
import Register from "./components/pages/admin/Register";
import Alerts from "./components/layout/Alerts";
import CreateContract from "./components/pages/contract/CreateContract";
import RedactContract from "./components/pages/contract/RedactContract";

import Logout from "./components/pages/auth/Logout";
import NotFound from "./components/pages/NotFound";
import MuiAlert from "./components/layout/MuiAlert";
import RequireAuth from "./components/route-guards/RequireAuth";
import RequireAnonymous from "./components/route-guards/RequireAnonymous";
import RequireAdmin from "./components/route-guards/RequireAdmin";
import RequireNotGuest from "./components/route-guards/RequireNotGuest";
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
            <UserState>
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
                      path='create_contract'
                      element={
                        <RequireNotGuest>
                          <CreateContract />
                        </RequireNotGuest>
                      }
                    />
                    <Route
                      path='redact_contract'
                      element={
                        <RequireNotGuest>
                          <RedactContract />
                        </RequireNotGuest>
                      }
                    />
                    <Route
                      path='login'
                      element={
                        <RequireAnonymous>
                          <Login />
                        </RequireAnonymous>
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
                    <Route path='*' element={<NotFound />} />
                  </Routes>
                </Fragment>
              </Router>
            </UserState>
          </AdminState>
        </AlertState>
      </AuthState>
    </ThemeProvider>
  );
};

export default App;
