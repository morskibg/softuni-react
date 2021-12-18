import { useState, useEffect, useContext } from "react";

import AuthContext from "../context/auth/authContext";

const useAdminGuard = () => {
  const [hasPermission, setHasPermission] = useState(false);

  const authContext = useContext(AuthContext);

  const { isAdmin, isAuthenticated, isGuest } = authContext;

  useEffect(() => {
    const canPass = isAuthenticated && isAdmin && !isGuest;
    console.log("IN ADMIN HHHOK", canPass);
    setHasPermission(canPass);
    // eslint-disable-next-line
  }, [isAdmin, isAuthenticated]);
  return isAuthenticated && isAdmin && !isGuest;
};

export default useAdminGuard;
