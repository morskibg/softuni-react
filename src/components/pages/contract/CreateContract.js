import React, { useState, useContext, useEffect, Fragment } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "./css/CreateContract.css";
import Spinner from "../../layout/Spinner";
import AuthContext from "../../../context/auth/authContext";
import AlertContext from "../../../context/alert/alertContext";
import UserContext from "../../../context/user/userContext";
import CounterpartyForm from "./forms/CounterpartyForm";
import ContractForm from "./forms/ContractForm";
import ItnForm from "./forms/ItnForm";
import ConfirmForm from "./forms/ConfirmForm";

import { Typography, Button, Stepper, Step, StepLabel } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import { useForm, FormProvider } from "react-hook-form";

import { Box } from "@mui/system";

import { useNavigate } from "react-router-dom";

const CreateContract = () => {
  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);
  const userContext = useContext(UserContext);

  const { isGuest, isAuthenticated, verifyToken } = authContext;
  const { setAlert } = alertContext;
  const {
    createContract,
    loading,
    stpCoeffs,
    avgMonthlyStp,
    avgMonthlyStpWeekEnd,
  } = userContext;

  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState();
  const [monthAggrGraph, setMonthAggrGraph] = useState();
  const [monthAggrWeekGraph, setMonthAggrWeekGraph] = useState();
  const [dataGraph, setDataGraph] = useState();

  const theme = useTheme();

  useEffect(() => {
    if (!isAuthenticated | isGuest) {
      navigate("/");
    } else {
      verifyToken();
    }
    return () => {
      console.log("from MASTER form unmounting");
    };
    // eslint-disable-next-line
  }, [isAuthenticated, isGuest]);

  useEffect(() => {
    if (authContext.error || userContext.error) {
      const alert = authContext.error ?? userContext.error;
      setAlert(alert.msg, alert.type);
      authContext.clearErrors();
      userContext.clearErrors();
    }

    setDataGraph(stpCoeffs);
    setMonthAggrGraph(avgMonthlyStp);
    setMonthAggrWeekGraph(avgMonthlyStpWeekEnd);
    // eslint-disable-next-line
  }, [isGuest, loading, stpCoeffs, avgMonthlyStp, avgMonthlyStpWeekEnd]);

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
  // const {
  //   register,
  //   handleSubmit,
  //   control,
  //   formState: { errors },
  // } = methods;

  const steps = getSteps();

  const handleNext = (data, err) => {
    if (activeStep === getSteps().length - 1) {
      createContract(formData);
      navigate("/");
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
                  {getStepContent(activeStep)}
                  {!loading && (
                    <Box className='create-contract-buttons'>
                      <Button disabled={activeStep === 0} onClick={handleBack}>
                        back
                      </Button>
                      <Button variant='contained' color='primary' type='submit'>
                        {activeStep === steps.length - 1 ? "Finish" : "Next"}
                      </Button>
                    </Box>
                  )}
                </form>
              </Box>
            </FormProvider>
          </Fragment>
        )}
      </Box>
      <Box className='create-contract-right'>
        <Box className='create-contract-right-container'>
          {loading ? (
            <>
              <Typography variant='h3' align='center'>
                Loading .....
              </Typography>
              <Spinner />
            </>
          ) : (
            steps[activeStep] === "Entry measurement point (ITN)" && (
              <Fragment>
                <Typography>Coefficients for whole period.</Typography>
                <ResponsiveContainer width='100%' height='100%'>
                  <BarChart
                    width={500}
                    height={500}
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
                    {/* <Legend /> */}
                    <Bar
                      dataKey='FullPeriod'
                      fill={theme.palette.barChart.primary}
                    />
                  </BarChart>
                </ResponsiveContainer>
                <Typography className='create-contract-graph_'>
                  Aggregated monthly coefficients for working days.
                </Typography>
                <ResponsiveContainer width='100%' height='100%'>
                  <BarChart
                    width={500}
                    height={500}
                    data={monthAggrGraph ?? []}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray='3 3' />
                    <XAxis dataKey='hour' />
                    <YAxis />
                    <Tooltip />
                    {/* <Legend /> */}
                    <Bar
                      dataKey='MonthlyAggregationWorkDays'
                      fill={theme.palette.barChart.secondary}
                    />
                  </BarChart>
                </ResponsiveContainer>
                <Typography className='create-contract-graph_'>
                  Aggregated monthly coefficients for non working days.
                </Typography>
                <ResponsiveContainer width='100%' height='100%'>
                  <BarChart
                    width={500}
                    height={300}
                    data={monthAggrWeekGraph ?? []}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray='3 3' />
                    <XAxis dataKey='hour' />
                    <YAxis />
                    <Tooltip />
                    {/* <Legend /> */}
                    <Bar
                      dataKey='MonthlyAggregationWeekDays'
                      fill={theme.palette.barChart.third}
                    />
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
