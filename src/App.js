import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Redirect,
  Route,
  Link,
} from "react-router-dom";
import AuthState from "./context/auth/AuthState";
import axios from "axios";
import Navbar from "./components/layout/Navbar";
import Test from "./components/Test";

import "./App.css";
import Login from "./components/auth/Login";

const App = () => {
  // const clickButton = async () => {
  //   let test = undefined;
  //   const config = {
  //     headers: {
  //       Authorization:
  //         "Bearer " +
  //         "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2MzcyMjk1NzYsInN1YiI6IjEifQ.tafJRnVsb8rqMX6xl7ZHYN3NbxvGhwLSRIjb7QvXGVQ",
  //     },
  //   };
  //   try {
  //     test = await axios.get(
  //       "https://softuni-react-backend.herokuapp.com/api/v1/users",
  //       config
  //     );
  //   } catch (error) {
  //     console.log(error);
  //   }
  //   console.log(test);
  // };
  return (
    <AuthState>
      <Router>
        <div className='App'>
          <Navbar />
          <div className='container'>
            <Login />
          </div>
        </div>
      </Router>
    </AuthState>
  );
};

export default App;
