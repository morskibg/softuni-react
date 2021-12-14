import React, { useContext, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { TextField } from "@mui/material";
import { Box } from "@mui/system";

import AuthContext from "../../../context/auth/authContext";
import UserContext from "../../../context/user/userContext";
import AlertContext from "../../../context/alert/alertContext";

import CounterpartyForm from "./forms/CounterpartyForm";
import ContractForm from "./forms/ContractForm";
import "./css/RedactContract.css";
import ContractsTable from "./tables/ContractsTable";

const RedactContract = () => {
  const methods = useForm();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = methods;
  const authContext = useContext(AuthContext);
  const { isAuthenticated, verifyToken } = authContext;
  const userContext = useContext(UserContext);
  const {
    getContracts,

    selectedContract,
  } = userContext;
  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    } else {
      verifyToken();
    }

    // eslint-disable-next-line
  }, [isAuthenticated]);

  useEffect(() => {
    if (authContext.error || userContext.error) {
      const alert = authContext.error ?? userContext.error;
      setAlert(alert.msg, alert.type);
      authContext.clearErrors();
      userContext.clearErrors();
    }

    // eslint-disable-next-line
  }, [authContext.error, userContext.error]);

  useEffect(() => {
    getContracts();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setValue("id", selectedContract?.id || "");
    // eslint-disable-next-line
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
