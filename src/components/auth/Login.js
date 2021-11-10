import React, { useState, useContext, useEffect } from "react";
// import AuthContext from "../../context/auth/authContext";
// import AlertContext from '../../context/alert/alertContext';
import PropTypes from "prop-types";
import AuthContext from "../../context/auth/authContext";

const Login = (props) => {
  // const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);
  const { login, error, clearErrors, isAuthenticated } = authContext;

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { email, password } = user;

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      console.log("Please fill in all fields", "danger");
    } else {
      login({
        email,
        password,
      });
    }
  };
  return (
    <div className='form-container'>
      <h1>
        Account <span className='text-primary'>Login</span>
      </h1>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='email'>Email Address</label>
          <input
            id='email'
            type='email'
            name='email'
            value={email}
            onChange={onChange}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input
            id='password'
            type='password'
            name='password'
            value={password}
            onChange={onChange}
            required
          />
        </div>
        <input
          type='submit'
          value='Login'
          className='btn btn-primary btn-block'
        />
      </form>
    </div>
  );
};

Login.propTypes = {
  email: PropTypes.string,
  password: PropTypes.string,
};
Login.defaultProps = {
  email: "admin@aol.com",
  password: "12345",
};

export default Login;
