import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AuthContext from "../../context/auth/authContext";
import AlertContext from "../../context/alert/alertContext";

const Login = () => {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);

  const { setAlert } = alertContext;
  const { login, error, clearErrors, isAuthenticated } = authContext;
  const navigate = useNavigate();
  const { state } = useLocation();
  console.log("🚀 ~ file: Login.js ~ line 15 ~ Login ~ state", state);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }

    if (error === "Incorrect email or password") {
      setAlert(error, "danger");
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated]);

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { email, password } = user;

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      setAlert("Please fill in all fields", "danger");
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

// Login.propTypes = {
//   email: PropTypes.string,
//   password: PropTypes.string,
// };
// Login.defaultProps = {
//   email: "admin@aol.com",
//   password: "12345",
// };

export default Login;
