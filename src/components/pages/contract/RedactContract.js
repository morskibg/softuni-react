import React, { useState, useContext, useEffect } from "react";
import { useForm, FormProvider, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { TextField } from "@mui/material";
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
  const [btnDisabled, setBtnDisabled] = useState(true);
  const methods = useForm();
  const {
    register,
    handleSubmit,
    setValue,
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
    selectedContract,
  } = userContext;
  const navigate = useNavigate();

  useEffect(() => {
    getContracts();
  }, []);

  useEffect(() => {
    setValue("id", selectedContract?.id || "");
  }, [selectedContract]);

  return (
    <FormProvider {...methods}>
      <Box className='redact-contract-container'>
        <Box className='redacting-contract-left-container'>
          <ContractsTable />
        </Box>
        <form onSubmit={handleSubmit()}>
          <Box className='redacting-contract-right-container'>
            <TextField
              fullWidth
              value={selectedContract?.id || ""}
              id='contractId'
              label='Contract id'
              variant='standard'
              {...register("id")}
            />

            <CounterpartyForm />
            <ContractForm />
            {/* <Button type='submit'>click</Button> */}
          </Box>
        </form>
      </Box>
    </FormProvider>
  );
};

export default RedactContract;
