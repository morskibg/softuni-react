import React, { useState, useContext, useEffect, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/auth/authContext";
import AlertContext from "../../context/alert/alertContext";
import "./Auth.css";
import background from "../../assets/login.jpg";

import {
  Button,
  FormControl,
  TextField,
  FormControlLabel,
  FormGroup,
  Switch,
  Divider,
  InputAdornment,
  IconButton,
} from "@mui/material";

import { useForm, Controller } from "react-hook-form";
import LoginIcon from "@mui/icons-material/Login";
import GuestIcon from "@mui/icons-material/PersonAddDisabled";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Box } from "@mui/system";

const Login = () => {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);

  const { setAlert } = alertContext;
  const { error, clearErrors, isAuthenticated, login } = authContext;
  const navigate = useNavigate();
  // const { state } = useLocation();

  const { control, handleSubmit, setValue } = useForm();
  const [values, setValues] = React.useState({
    password: "",
    showPassword: false,
  });

  // const onSubmit = (data) => console.log(data);

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

  const [checked, setChecked] = useState(false);

  const onGuestSliderChange = (event) => {
    if (event.target.checked) {
      setValue("email", "guestUser@demo.com", { shouldValidate: true });
      setValue("password", "guestUser", { shouldValidate: true });
    } else {
      setValue("email", "");
      setValue("password", "");
    }

    setChecked(event.target.checked);
  };

  const onSubmitHandler = (data, e) => {
    e.preventDefault();
    const email = data.email;
    const password = data.password;
    if (email === "" || password === "") {
      setAlert("Please fill in all fields", "danger");
    } else {
      login({
        email,
        password,
      });
    }
  };
  const onError = (errors, e) => console.log(errors, e);

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Fragment>
      <div className='form-container'>
        <div className='leftSide'>
          <div className='loginInput'>
            {/* <h1>
              Account <span className='text-primary'>Login</span>
            </h1> */}
            <FormControl>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Switch
                      checked={checked}
                      onChange={onGuestSliderChange}
                      color='error'
                    />
                  }
                  label='Login as Guest'
                />
              </FormGroup>
              <Divider />
              <Controller
                name='email'
                control={control}
                defaultValue=''
                rules={{ required: "Email is required" }}
                render={({ field: { onChange, value }, fieldState }) => (
                  <TextField
                    label='Email'
                    variant='standard'
                    value={value}
                    onChange={onChange}
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  />
                )}
              />
              <Controller
                name='password'
                control={control}
                defaultValue=''
                rules={{ required: "Password is required" }}
                render={({ field: { onChange, value }, fieldState }) => (
                  <TextField
                    label='Password'
                    variant='standard'
                    type={values.showPassword ? "text" : "password"}
                    value={value}
                    name='password'
                    onChange={onChange}
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position='end'>
                          <IconButton
                            aria-label='toggle password visibility'
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge='end'
                          >
                            {values.showPassword ? (
                              <VisibilityOffIcon />
                            ) : (
                              <VisibilityIcon />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />

              <Box m={2} pt={3}>
                <Button
                  type='submit'
                  variant='contained'
                  endIcon={checked ? <GuestIcon /> : <LoginIcon />}
                  color={checked ? "error" : "primary"}
                  onClick={handleSubmit(onSubmitHandler, onError)}
                >
                  Login
                </Button>
              </Box>
            </FormControl>
          </div>
        </div>
        <div
          className='rightSide'
          style={{
            backgroundImage: `url(${background})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        >
          {/* <img className='loginImg' src={`${background}`} alt='bcg' />; */}
        </div>
      </div>
    </Fragment>
  );
};
export default Login;
