import React, { useState, useContext, useEffect, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import AuthContext from "../../../context/auth/authContext";
import AlertContext from "../../../context/alert/alertContext";
import AdminContext from "../../../context/admin/adminContext";
import UserContext from "../../../context/user/userContext";
import Spinner from "../../layout/Spinner";

import "./Login.css";
import background from "../../../assets/login.jpg";

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

// import { useTheme } from "@mui/material/styles";
import LoginIcon from "@mui/icons-material/Login";
import GuestIcon from "@mui/icons-material/PersonAddDisabled";
import { Box } from "@mui/system";

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const Login = () => {
  // const theme = useTheme();
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);
  const adminContext = useContext(AdminContext);
  const userContext = useContext(UserContext);

  const { setAlert } = alertContext;
  const { error, clearErrors, isAuthenticated, login, startLoader, loading } =
    authContext;
  const navigate = useNavigate();

  // const { state } = useLocation();

  const { control, handleSubmit, setValue } = useForm();
  const [values, setValues] = useState({
    password: "",
    showPassword: false,
  });

  // const onSubmit = (data) => console.log(data);

  useEffect(() => {
    console.log("in LOGIN use effect");
    if (isAuthenticated) {
      navigate("/");
    }

    if (error === "Incorrect email or password") {
      setAlert(error, "danger");
      clearErrors();
    }
    if (authContext.error || adminContext.error || userContext.error) {
      console.log(
        "🚀 ~ file: Login.js ~ line 63 ~ useEffect ~ userContext.error",
        userContext.error
      );
      console.log(
        "🚀 ~ file: Login.js ~ line 63 ~ useEffect ~ adminContext.error",
        adminContext.error
      );
      console.log(
        "🚀 ~ file: Login.js ~ line 63 ~ useEffect ~ authContext.error",
        authContext.error
      );
      const alert =
        authContext.error ?? adminContext.error ?? userContext.error;
      console.log("🚀 ~ file: LOGIN.js ~ line 77 ~ useEffect ~ alert", alert);

      setAlert(alert.msg, alert.type);
      authContext.clearErrors();
      adminContext.clearErrors();
      userContext.clearErrors();
    }

    // eslint-disable-next-line
  }, [
    error,
    isAuthenticated,
    authContext.error,
    adminContext.error,
    userContext.error,
  ]);

  const [checked, setChecked] = useState(false);

  const onGuestSliderChange = (event) => {
    if (event.target.checked) {
      setValue("email", process.env.REACT_APP_GUEST_EMAIL, {
        shouldValidate: true,
      });
      setValue("password", process.env.REACT_APP_GUEST_PASSWORD, {
        shouldValidate: true,
      });
      // theme.palette.primary = theme.palette.error;
    } else {
      setValue("email", "");
      setValue("password", "");
      // theme.palette.primary = theme.palette.info;
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
      startLoader();
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
  if (loading) {
    return <Spinner />;
  } else {
    return (
      <Fragment>
        <div className='form-container'>
          <div className='leftSide'>
            <div className='loginInput'>
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
                    sx={{ color: checked ? "error.main" : "primary.main" }}
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
                      InputProps={{
                        readOnly: checked,
                      }}
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
                        readOnly: checked,
                        endAdornment: (
                          <InputAdornment position='start'>
                            <IconButton
                              aria-label='toggle password visibility'
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge='end'
                              sx={{
                                color: checked ? "error.main" : "primary.main",
                              }}
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
          ></div>
        </div>
      </Fragment>
    );
  }
};
export default Login;
