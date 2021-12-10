import React, { useState, useContext, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Container } from "@mui/material";
import { Box } from "@mui/system";
import { Button, ButtonGroup } from "@mui/material";
import { Typography } from "@mui/material";
import RegisterIcon from "@mui/icons-material/Storage";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ClearIcon from "@mui/icons-material/LayersClear";
import AuthContext from "../../../context/auth/authContext";
import UserContext from "../../../context/user/userContext";

import CounterpartyForm from "./forms/CounterpartyForm";
import ContractForm from "./forms/ContractForm";
import "./css/RedactContract.css";
import ContractsTable from "./tables/ContractsTable";

const RedactContract = () => {
  const { formData, setFormData } = useState({});
  const [btnDisabled, setBtnDisabled] = useState(true);
  const methods = useForm();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = methods;
  const authContext = useContext(AuthContext);
  const { isAuthenticated, verifyToken, isGuest } = authContext;
  const userContext = useContext(UserContext);
  const {
    getAvlItns,
    loading,
    startLoader,
    clearStp,
    getContracts,
    contracts,
  } = userContext;
  const navigate = useNavigate();
  useEffect(() => {
    getContracts();
  }, []);

  return (
    <FormProvider {...methods}>
      <Box className='redact-contract-container'>
        <Box className='redacting-contract-left-container'>
          <ContractsTable />
        </Box>
        <Box className='redacting-contract-right-container'>
          <CounterpartyForm />
          <ContractForm />
        </Box>
      </Box>
    </FormProvider>
  );
};

export default RedactContract;
