import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';

function RequireAuth({ children }) {
  console.log('AAAAADMINNNN');
  const authContext = useContext(AuthContext);
  const { isAdmin } = authContext;

  if (!isAdmin) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to='/' />;
  }

  return children;
}
export default RequireAuth;
