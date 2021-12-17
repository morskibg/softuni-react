import { useState, useEffect, useContext } from "react";

import AuthContext from "../context/auth/authContext";

const useUserGuard = () => {
  const [hasPermission, setHasPermission] = useState(false);

  const authContext = useContext(AuthContext);

  const { isGuest, isAuthenticated } = authContext;

  useEffect(() => {
    // console.log("in useUserGuard", isGuest, isAuthenticated);
    const canPass = isAuthenticated && !isGuest;
    setHasPermission(canPass);

    // eslint-disable-next-line
  }, [isGuest, isAuthenticated]);
  return isAuthenticated && !isGuest;
};

export default useUserGuard;
