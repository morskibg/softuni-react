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

const ConfirmDialog = ({ handleConfirm, handleCancel }) => {
  const [open, setOpen] = useState(true);
  const { control, handleSubmit, setValue } = useForm();

  const handleClose = () => {
    setOpen(false);
  };

  const onConfirmHandler = (e) => {
    console.log("in onConfirmHandler ConfirmDialog");
    handleConfirm();
  };

  const onError = (errors, e) => console.log(errors, e);
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Confirm Action</DialogTitle>
      <DialogContent>
        <DialogContentText>Are You sure ?</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel}>Cancel</Button>
        <Button
          // disabled={btnDisabled}
          onClick={handleSubmit(onConfirmHandler, onError)}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
