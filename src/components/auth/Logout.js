import React, { useEffect, useContext } from "react";

import AuthContext from "../../context/auth/authContext";

const Logout = () => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, logout } = authContext;

  useEffect(() => {
    if (isAuthenticated) {
      logout();
    }
    // eslint-disable-next-line
  }, []);

  return <></>;
};

export default Logout;
