import React, { useState, useContext, useEffect } from "react";

import { useForm, Controller } from "react-hook-form";
import AdminContext from "../../context/admin/adminContext";
import AuthContext from "../../context/auth/authContext";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import {
  Button,
  FormControl,
  TextField,
  FormControlLabel,
  FormGroup,
  Switch,
} from "@mui/material";

const ModifyUser = ({ reloadCallback }) => {
  const adminContext = useContext(AdminContext);
  const authContext = useContext(AuthContext);
  const { currentUser, clearCurrUser, modifyUser } = adminContext;
  const { user, getUserData } = authContext;

  const { control, handleSubmit, setValue } = useForm();

  useEffect(() => {
    if (currentUser) {
      setValue("email", currentUser.email, {
        shouldValidate: true,
      });
      setValue("full_name", currentUser.full_name, {
        shouldValidate: true,
      });
      setValue("is_superuser", currentUser.is_superuser, {
        shouldValidate: true,
      });
      setValue("is_active", currentUser.is_active, {
        shouldValidate: true,
      });
      setBtnDisabled(false);
    }
    if (!user) {
      getUserData();
    }
  }, [user]);

  const [open, setOpen] = useState(true);

  const [btnDisabled, setBtnDisabled] = useState(true);

  const handleClose = () => {
    setOpen(false);
    clearCurrUser();
    reloadCallback();
  };

  const onSubmitHandler = (data, e) => {
    const fullData = { ...currentUser, ...data };
    fullData.creator_email = user.email;
    modifyUser(fullData);
    clearCurrUser();
    handleClose();
  };

  const onError = (errors, e) => console.log(errors, e);

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Modify User</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Modify some user's data. If 'Is Active' is switched-off, the user will
          be treated as deleted.
        </DialogContentText>
        <FormControl>
          {/* <Divider /> */}
          <Controller
            name='full_name'
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
            name='is_superuser'
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
          <Controller
            name='is_active'
            control={control}
            defaultValue={false}
            render={({ field: { onChange, value }, fieldState }) => (
              <FormGroup>
                <FormControlLabel
                  control={<Switch checked={value} onChange={onChange} />}
                  label='Is Active'
                />
              </FormGroup>
            )}
          />
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          disabled={btnDisabled}
          onClick={handleSubmit(onSubmitHandler, onError)}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModifyUser;
