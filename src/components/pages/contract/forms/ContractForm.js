import React, { useContext, useEffect, Fragment } from "react";
import { useNavigate } from "react-router-dom";

import { Controller, useFormContext } from "react-hook-form";

import { TextField, Typography } from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { addDays, format, isAfter, isBefore, isValid } from "date-fns";

import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import { Box } from "@mui/system";

import AuthContext from "../../../../context/auth/authContext";

import UserContext from "../../../../context/user/userContext";

const ContractForm = () => {
  // const { city, postalCode, addressLine } = props.data;
  const userContext = useContext(UserContext);

  const { getAvlItns, loading, startLoader, clearStp } = userContext;

  const { control, getValues, setValue, trigger, watch } = useFormContext();
  const authContext = useContext(AuthContext);
  const { isAuthenticated, verifyToken, isGuest } = authContext;
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated | isGuest) {
      navigate("/");
    } else {
      verifyToken();
    }
  }, [isAuthenticated, isGuest]);

  useEffect(() => {
    // getAvlItns({
    //   startDate: `${format(new Date(getValues()["startDate"]), "dd/MM/yyyy")}`,
    //   endDate: `${format(new Date(getValues()["endDate"]), "dd/MM/yyyy")}`,
    // });
    if (getValues()["startDate"] && getValues()["endDate"]) {
      dateChangeHandler();
      trigger("startDate");
      trigger("endDate");
    }
  }, [watch("endDate"), watch("startDate")]);

  const dateChangeHandler = (date) => {
    getAvlItns({
      startDate: `${format(new Date(getValues()["startDate"]), "dd/MM/yyyy")}`,
      endDate: `${format(new Date(getValues()["endDate"]), "dd/MM/yyyy")}`,
    });
  };

  // const sdateChangeHandler = (date) => {
  //   console.log("in sdateChangeHandler");
  //   setValue("endDate", "", {});
  // };

  return (
    <Fragment>
      <Box className='contract-form'>
        <Controller
          control={control}
          name='startDate'
          defaultValue={addDays(Date.now(), 1)}
          rules={{
            required: "Contract start date is required",
            validate: (value) =>
              (isValid(value) &&
                isAfter(value, new Date(31, 12, 2020)) &&
                isBefore(value, getValues()["endDate"])) ||
              (!isValid(value)
                ? "Invalid date"
                : "Date is not between 01/01/2021 and contract end date"),
          }}
          render={({ field, fieldState }) => (
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DesktopDatePicker
                label='Contract start date'
                inputFormat='dd/MM/yyyy'
                value={field.value}
                onChange={(newValue) => {
                  // setStartDateValue(newValue);
                  field.onChange(newValue);
                  dateChangeHandler();
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant='standard'
                    // value={field.value}
                    onChange={field.onChange}
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                    InputProps={{
                      ...params.InputProps,
                      type: "date",
                    }}
                    {...field}
                  />
                )}
              />
            </LocalizationProvider>
          )}
        />

        <Controller
          control={control}
          name='endDate'
          defaultValue={addDays(Date.now(), 2)}
          rules={{
            required: "Contract end date is required",
            validate: (value) =>
              (isValid(value) && isAfter(value, getValues()["startDate"])) ||
              (!isValid(value)
                ? "Invalid date"
                : "End date must be after start date"),
          }}
          render={({ field, fieldState }) => (
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DesktopDatePicker
                label='Contract end date'
                inputFormat='dd/MM/yyyy'
                value={field.value}
                onChange={(newValue) => {
                  // setStartDateValue(newValue);
                  field.onChange(newValue);
                  dateChangeHandler();
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    sx={{ mt: "1rem" }}
                    variant='standard'
                    // value={field.value}
                    onChange={field.onChange}
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                    InputProps={{
                      ...params.InputProps,
                      type: "date",
                    }}
                    {...field}
                  />
                )}
              />
            </LocalizationProvider>
          )}
        />
        <Controller
          control={control}
          name='price'
          defaultValue=''
          rules={{
            required: "Price is required",
            min: { value: 0.01, message: "Min price is 0.01 BGN/kWh " },
            max: { value: 2, message: "Max price is 2 BGN/kWh " },
          }}
          render={({ field, fieldState }) => (
            <TextField
              id='price'
              label='Price (BGN/kWh)'
              variant='standard'
              placeholder='Enter price (BGN/kWh)'
              fullWidth
              margin='normal'
              value={field.value}
              onChange={field.onChange}
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
              {...field}
            />
          )}
        />
      </Box>
    </Fragment>
  );
};
export default ContractForm;
