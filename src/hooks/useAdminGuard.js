import { useState, useEffect, useContext } from "react";

import AuthContext from "../context/auth/authContext";

const useAdminGuard = () => {
  const [hasPermission, setHasPermission] = useState(false);

  const authContext = useContext(AuthContext);

  const { isAdmin, isAuthenticated } = authContext;

  useEffect(() => {
    console.log("in useADMINGuard", isAdmin);
    const canPass = isAuthenticated && isAdmin;
    setHasPermission(canPass);

    // eslint-disable-next-line
  }, [isAdmin, isAuthenticated]);
  return isAuthenticated && isAdmin;
};

export default useAdminGuard;
