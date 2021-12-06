import React, {
  useState,
  useContext,
  useEffect,
  Fragment,
  PureComponent,
} from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "./CreateContract.css";
import Spinner from "../../layout/Spinner";
import AuthContext from "../../../context/auth/authContext";
import AlertContext from "../../../context/alert/alertContext";
import UserContext from "../../../context/user/userContext";

import { Typography, Button, Stepper, Step, StepLabel } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";

import { useForm, FormProvider } from "react-hook-form";

import { Box } from "@mui/system";

import { useNavigate } from "react-router-dom";

import { CounterpartyForm, ContractForm, ItnForm, ConfirmForm } from "./Forms";

const CreateContract = () => {
  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);
  const userContext = useContext(UserContext);

  const { isGuest, isAuthenticated, verifyToken } = authContext;
  const { setAlert } = alertContext;
  const { createContract, loading, stpCoeffs } = userContext;

  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState();
  const [dataGraph, setDataGraph] = useState();

  const theme = useTheme();

  useEffect(() => {
    if (!isAuthenticated | isGuest) {
      navigate("/");
    } else {
      verifyToken();
    }
  }, [isAuthenticated, isGuest]);

  useEffect(() => {
    if (authContext.error || userContext.error) {
      const alert = authContext.error ?? userContext.error;
      setAlert(alert.msg, alert.type);
      authContext.clearErrors();
      userContext.clearErrors();
    }
    // if (isGuest || !isAuthenticated) {
    //   navigate("/login");
    // }

    setDataGraph(stpCoeffs);
  }, [isGuest, loading, stpCoeffs]);

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <CounterpartyForm />;
      case 1:
        return <ContractForm data={formData} />;
      case 2:
        return <ItnForm data={formData} />;
      case 3:
        return <ConfirmForm data={formData} />;
      default:
        return "unknown step";
    }
  };
  const getSteps = () => {
    return [
      "Choose or create counterparty",
      "Contract details",
      "Entry measurement point (ITN)",
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
    if (activeStep === getSteps().length - 1) {
      console.log(
        "🚀 ~ file: CreateContract.js ~ line 83 ~ handleNext ~ formData",
        formData
      );
      createContract(formData);
      navigate("/");

      // setActiveStep(0);
      // setFormData({});
    } else {
      setFormData((prevData) => ({ ...prevData, ...data }));
      setActiveStep((prevState) => prevState + 1);
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

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
            Thank You !
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
                  {!loading && (
                    <Box className='create-contract-buttons'>
                      <Button
                        // className={classes.button}
                        disabled={activeStep === 0}
                        onClick={handleBack}
                      >
                        back
                      </Button>
                      {/* {steps[activeStep] ===
                        "Entry measurement point (ITN)" && (
                        <Button
                          // className={classes.button}

                          onClick={handleBack}
                        >
                          add another itn
                        </Button>
                      )} */}

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
                  )}
                </form>
              </Box>
              {/* </FormControl> */}
            </FormProvider>
          </Fragment>
        )}
      </Box>
      <Box className='create-contract-right'>
        <Box className='create-contract-right-container'>
          {loading ? (
            <>
              <Typography>Loading Load Profile .....</Typography>
              <Spinner />
            </>
          ) : (
            steps[activeStep] === "Entry measurement point (ITN)" && (
              <Fragment>
                <ResponsiveContainer width='100%' height='100%'>
                  {/* <BarChart width={150} height={40} data={dataGraph ?? []}>
                  <Bar dataKey='data' fill='#8884d8' />
                </BarChart> */}
                  <BarChart
                    width={500}
                    height={300}
                    data={dataGraph ?? []}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray='3 3' />
                    <XAxis dataKey='eet' />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    {/* <Bar dataKey='pv' fill='#8884d8' /> */}
                    <Bar dataKey='data' fill={theme.palette.barChart.primary} />
                  </BarChart>
                </ResponsiveContainer>
                <ResponsiveContainer width='100%' height='100%'>
                  {/* <BarChart width={150} height={40} data={dataGraph ?? []}>
                  <Bar dataKey='data' fill='#8884d8' />
                </BarChart> */}
                  <BarChart
                    width={500}
                    height={300}
                    data={dataGraph ?? []}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray='3 3' />
                    <XAxis dataKey='eet' />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    {/* <Bar dataKey='pv' fill='#8884d8' /> */}
                    <Bar dataKey='data' fill={theme.palette.barChart.primary} />
                  </BarChart>
                </ResponsiveContainer>
              </Fragment>
            )
          )}
        </Box>
      </Box>
    </Box>
  );
  // }
};

export default CreateContract;
