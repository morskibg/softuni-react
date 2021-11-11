import React, { Fragment } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Redirect,
  Route,
  Link,
} from 'react-router-dom';
import AuthState from './context/auth/AuthState';
import AlertState from './context/alert/AlertState';
import axios from 'axios';
import Navbar from './components/layout/Navbar';
import Test from './components/Test';

import './App.css';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Alerts from './components/layout/Alerts';
import Logout from './components/auth/Logout';
import RequireAuth from './components/auth/RequireAuth';
import RequireGuest from './components/auth/RequireGuest';

const App = () => {
  return (
    <AuthState>
      <AlertState>
        <Router>
          <Fragment>
            <Navbar />
            <div className='container'>
              <Alerts />
              <Routes>
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
                {/* <PrivateRoute path='logout' element={<Logout />} /> */}
              </Routes>
            </div>
          </Fragment>
        </Router>
      </AlertState>
    </AuthState>
  );
};

export default App;
