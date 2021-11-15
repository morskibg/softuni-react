import React, { Fragment, useContext } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import AuthContext from "../../context/auth/authContext";

const Navbar = (props) => {
  const { icon, title } = props;
  const authContext = useContext(AuthContext);
  const { isAuthenticated } = authContext;

  return (
    <nav className='navbar bg-primary'>
      <h1>
        <i className={icon} /> {title}
      </h1>
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='about'>About</Link>
        </li>
        {isAuthenticated && (
          <li>
            <Link to='logout'>Logout</Link>
          </li>
        )}
        {!isAuthenticated && (
          <Fragment>
            <li>
              <Link to='register'>Register</Link>
            </li>
            <li>
              <Link to='login'>Login</Link>
            </li>
          </Fragment>
        )}
      </ul>
    </nav>
  );
};
Navbar.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.string,
};
Navbar.defaultProps = {
  title: "Power",
  icon: "fas fa-plug",
};

export default Navbar;
