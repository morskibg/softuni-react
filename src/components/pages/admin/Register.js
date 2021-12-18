import React, { useContext, useEffect, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import useAdminGuard from "../../../hooks/useAdminGuard";

import { Box } from "@mui/system";
import ClearIcon from "@mui/icons-material/LayersClear";

import RegisterIcon from "@mui/icons-material/Storage";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import {
  Button,
  FormControl,
  TextField,
  FormControlLabel,
  FormGroup,
  Switch,
  InputAdornment,
  IconButton,
  ButtonGroup,
} from "@mui/material";

import "./Register.css";
import AlertContext from "../../../context/alert/alertContext";
import AuthContext from "../../../context/auth/authContext";
import AdminContext from "../../../context/admin/adminContext";
import isAdminHoc from "../../../hoc/isAdmin";
import background from "../../../assets/login2.jpg";

const Register = () => {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);
  const adminContext = useContext(AdminContext);

  const { setAlert } = alertContext;
  const {  getUserData, user } = authContext;
  const { registerUser } = adminContext;
 
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (!hasAdminPermission) {
  //     navigate("/");
  //   }

  //   // eslint-disable-next-line
  // }, [hasAdminPermission]);

  useEffect(() => {
    if (authContext.error || adminContext.error) {
      const alert = authContext.error ?? adminContext.error;

      setAlert(alert.msg, alert.type);
      authContext.clearErrors();
      adminContext.clearErrors();
    }
    
    if (!user) {
      getUserData();
    }

    // eslint-disable-next-line
  }, [
    // isAdmin,
    // isAuthenticated,
    // isGuest,
    adminContext.error,
    authContext.error,
  ]);

  const { control, handleSubmit, reset } = useForm();

  const handleCancel = () => {
    navigate("/");
  };

  const handleReset = (e) => {
    reset({
      fullname: "",
      email: "",
      isAdmin: false,
      password: "",
      rePassword: "",
    });
  };

  const onSubmitHandler = (data, e) => {
    e.preventDefault();

    const { email, password, rePassword } = data;
    const full_name = data.fullname;
    const is_superuser = data.isAdmin;

    if (email === "" || password === "" || rePassword === "") {
      setAlert("Please fill in all fields", "danger");
    } else if (password !== rePassword) {
      setAlert("Passwords not match !", "danger");
    } else {
      registerUser({
        email,
        is_active: true,
        is_superuser,
        full_name,
        password,
        creator_email: authContext.user.email,
      });
      navigate("/");
    }
  };
  const onError = (errors, e) => console.log(errors, e);

  return (
    <Fragment>
      <div className='register-form-container'>
        <div className='register-rightSide'>
          <div className='register-loginInput'>
            <FormControl>
              <Controller
                name='fullname'
                control={control}
                defaultValue=''
                rules={{ required: "Full Name is required" }}
                render={({ field: { onChange, value }, fieldState }) => (
                  <TextField
                    label='Full Name'
                    variant='standard'
                    value={value}
                    onChange={onChange}
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  />
                )}
              />
              <Controller
                name='email'
                control={control}
                defaultValue=''
                rules={{
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                }}
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
                    // type={values.showPassword ? "text" : "password"}
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
                            // onClick={handleClickShowPassword}
                            // onMouseDown={handleMouseDownPassword}
                            edge='end'
                          >
                            {/* {values.showPassword ? (
                              <VisibilityOffIcon />
                              ) : (
                                <VisibilityIcon />
                            )} */}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />
              <Controller
                name='rePassword'
                control={control}
                defaultValue=''
                rules={{ required: "Confirm Password is required" }}
                render={({ field: { onChange, value }, fieldState }) => (
                  <TextField
                    label='Confirm Password'
                    variant='standard'
                    // type={values.showPassword ? "text" : "password"}
                    value={value}
                    name='RePassword'
                    onChange={onChange}
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position='end'>
                          <IconButton
                            aria-label='toggle password visibility'
                            // onClick={handleClickShowPassword}
                            // onMouseDown={handleMouseDownPassword}
                            edge='end'
                          >
                            {/* {values.showPassword ? (
                              <VisibilityOffIcon />
                              ) : (
                                <VisibilityIcon />
                            )} */}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />

              <Controller
                name='isAdmin'
                control={control}
                defaultValue={false}
                render={({ field: { onChange, value }, fieldState }) => (
                  <FormGroup>
                    <FormControlLabel
                      control={<Switch checked={value} onChange={onChange} />}
                      label='Is Administrator'
                    />
                  </FormGroup>
                )}
              />

              <Box m={2} pt={3}>
                <ButtonGroup
                  variant='contained'
                  aria-label='outlined primary button group'
                >
                  <Button startIcon={<ArrowBackIcon />} onClick={handleCancel}>
                    Cancel
                  </Button>
                  <Button startIcon={<ClearIcon />} onClick={handleReset}>
                    Reset
                  </Button>
                  <Button
                    type='submit'
                    variant='contained'
                    endIcon={<RegisterIcon />}
                    color={"primary"}
                    onClick={handleSubmit(onSubmitHandler, onError)}
                  >
                    Register
                  </Button>
                </ButtonGroup>
              </Box>
            </FormControl>
          </div>
        </div>
        <div
          className='register-rightSide'
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
};

export default isAdminHoc(Register);
