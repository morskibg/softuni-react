import React, { useState, useContext, useEffect, Fragment } from "react";
import "./CreateContract.css";
import AuthContext from "../../../context/auth/authContext";
import AlertContext from "../../../context/alert/alertContext";
import UserContext from "../../../context/user/userContext";

import {
  Typography,
  TextField,
  Button,
  Stepper,
  Step,
  StepLabel,
} from "@mui/material";

import {
  useForm,
  Controller,
  FormProvider,
  useFormContext,
} from "react-hook-form";

import { Box } from "@mui/system";

import { useNavigate } from "react-router-dom";

import { CounterpartyForm, ContactForm, ConfirmForm } from "./Forms";

const CreateContract = () => {
  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);
  const userContext = useContext(UserContext);

  const { isGuest } = authContext;
  const { setAlert } = alertContext;
  const { getAddresses, getContractors } = userContext;

  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState();

  useEffect(() => {
    console.log("loading .....");
    if (authContext.error || userContext.error) {
      const alert = authContext.error ?? userContext.error;
      setAlert(alert.msg, alert.type);
      authContext.clearErrors();
      userContext.clearErrors();
    }
    if (isGuest) {
      navigate("/login");
    }
    getAddresses();
    getContractors();
  }, [isGuest]);

  const getStepContent = (step) => {
    // console.log("in getStepContent --->", formData);

    switch (step) {
      case 0:
        return <CounterpartyForm />;
      case 1:
        return <ContactForm data={formData} />;
      case 2:
        return <ConfirmForm data={formData} />;
      // case 3:
      //   return <PaymentForm />;
      default:
        return "unknown step";
    }
  };
  const getSteps = () => {
    return [
      "Choose or create counterparty",
      "Contract details",
      "Confirm",
      // "Payment",
    ];
  };

  const methods = useForm();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = methods;

  const steps = getSteps();

  const handleNext = (data, err) => {
    setFormData((prevData) => ({ ...prevData, ...data }));
    setActiveStep((prevState) => prevState + 1);

    if (activeStep === 2) {
      console.log("DATA ->>>>>>>>>>", formData);
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };
  // console.log("OUT state ---> ", formData);

  return (
    <Box className='create-contract-container'>
      <Box className='create-contract-left'>
        <Stepper alternativeLabel activeStep={activeStep}>
          {steps.map((step, index) => {
            const labelProps = {};
            const stepProps = {};

            return (
              <Step {...stepProps} key={index}>
                <StepLabel {...labelProps}>{step}</StepLabel>
              </Step>
            );
          })}
        </Stepper>

        {activeStep === steps.length ? (
          <Typography variant='h3' align='center'>
            Thank You
          </Typography>
        ) : (
          <Fragment>
            <FormProvider {...methods}>
              <Box
                className={
                  activeStep === steps.length - 1
                    ? "create-contract-forms-container-wide"
                    : "create-contract-forms-container"
                }
              >
                <form onSubmit={methods.handleSubmit(handleNext)}>
                  {/* <FormControl> */}
                  {getStepContent(activeStep)}
                  <Box className='create-contract-buttons'>
                    <Button
                      // className={classes.button}
                      disabled={activeStep === 0}
                      onClick={handleBack}
                    >
                      back
                    </Button>

                    <Button
                      // className={classes.button}
                      variant='contained'
                      color='primary'
                      // onClick={handleNext}
                      type='submit'
                    >
                      {activeStep === steps.length - 1 ? "Finish" : "Next"}
                    </Button>
                  </Box>
                </form>
              </Box>
              {/* </FormControl> */}
            </FormProvider>
          </Fragment>
        )}
      </Box>
      {/* <Box className='create-contract-right'>
        <Box className='create-contract-right-container'>
          <Typography>
            PROBAsssssssssddddddddddddddddddddddddddddddddddddddddddddssssssssss
          </Typography>
        </Box>
      </Box> */}
    </Box>
  );
};

export default CreateContract;
