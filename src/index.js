import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import ThemeState from "./context/theme/ThemeState";
import axios from "axios";

if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
  // development URL
  axios.defaults.baseURL = `${process.env.REACT_APP_API_SERVER_DEVELOPMENT}${process.env.API_VERSION}`;
} else {
  // production URL
  axios.defaults.baseURL = `${process.env.REACT_APP_API_SERVER_PRODUCTION}${process.env.API_VERSION}`;
}

ReactDOM.render(
  <React.StrictMode>
    <ThemeState>
      <App />
    </ThemeState>
  </React.StrictMode>,
  document.getElementById("root")
);
