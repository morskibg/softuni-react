import React, { useEffect, useContext } from "react";

import AuthContext from "../../context/auth/authContext";
import AdminContext from "../../context/admin/adminContext";

const Logout = () => {
  const authContext = useContext(AuthContext);
  const adminContext = useContext(AdminContext);

  const { isAuthenticated, logout } = authContext;
  const { clearUsersFromState } = adminContext;

  useEffect(() => {
    if (isAuthenticated) {
      // clearUsersFromState();
      logout();
    }
    // eslint-disable-next-line
  }, []);

  return <></>;
};

export default Logout;
