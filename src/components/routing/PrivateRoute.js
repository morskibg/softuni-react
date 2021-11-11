import React, { useContext } from "react";
import { Navigate, Route } from "react-router-dom";
import AuthContext from "../../context/auth/authContext";

function PrivateRoute({ element, path }) {
  const authContext = useContext(AuthContext);
  const { isAuthenticated } = authContext;

  const ele =
    isAuthenticated === true ? (
      element
    ) : (
      <Navigate to='/login' replace state={{ path }} />
    );

  return <Route path={path} element={ele} />;
}
export default PrivateRoute;
