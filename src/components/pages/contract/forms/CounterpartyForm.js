import React, { useContext, useEffect, Fragment } from "react";
// import { useNavigate } from "react-router-dom";

import { Controller, useFormContext } from "react-hook-form";
import Spinner from "../../../layout/Spinner";
import { TextField } from "@mui/material";
// import AdapterDateFns from "@mui/lab/AdapterDateFns";
// import LocalizationProvider from "@mui/lab/LocalizationProvider";
// import { addDays, format, isAfter, isBefore, isValid } from "date-fns";

// import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
// import { Box } from "@mui/system";

import AuthContext from "../../../../context/auth/authContext";
// import AlertContext from "../../../../context/alert/alertContext";

import UserContext from "../../../../context/user/userContext";
import Autocomplete from "@mui/material/Autocomplete";

// import { stpCodes } from "../../../../utils/Constants";
// import SummaryTable from "../tables/ContractsTable";

const CounterpartyForm = () => {
  const { control, setValue, reset } = useFormContext();

  const userContext = useContext(UserContext);
  const { getAddresses, getContractors, contractors, loading, startLoader } =
    userContext;
  const authContext = useContext(AuthContext);
  const { isAuthenticated, isGuest } = authContext;
  // const navigate = useNavigate();

  useEffect(() => {
    startLoader();
    getContractors();
    startLoader();
    getAddresses();
    return () => {
      console.log("from first form unmounting");
    };
    // eslint-disable-next-line
  }, [isAuthenticated, isGuest]);

  const companyChangeHandlerGeneric = (itemName, item, newValueName) => {
    const selectedCompany = contractors.filter((x) => x[itemName] === item);
    let newValue = null;
    if (selectedCompany.length > 0) {
      newValue = selectedCompany[0][newValueName];
      setValue(newValueName, newValue, { shouldValidate: true });
      setValue("city", selectedCompany[0].address.city, {
        shouldValidate: true,
      });
      setValue("postalCode", selectedCompany[0].address.postal_code, {
        shouldValidate: true,
      });
      setValue("addressLine", selectedCompany[0].address.address_line, {
        shouldValidate: true,
      });
    } else {
      resetForm();
    }
  };

  const resetForm = () => {
    reset({
      name: "",
      eik: "",
      city: "",
      postalCode: "",
      addressLine: "",
    });
  };
  if (loading) {
    return <Spinner />;
  } else {
    return (
      <Fragment>
        <Controller
          control={control}
          name='name'
          defaultValue=''
          rules={{ required: "Company name is required" }}
          render={({ field, fieldState }) => (
            <Autocomplete
              disableClearable={false}
              onChange={(event, item) => {
                field.onChange(item);
                companyChangeHandlerGeneric("name", item, "eik");
              }}
              value={field.value}
              freeSolo
              options={contractors.map((x) => x.name)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  id='first-name'
                  label='Company name'
                  variant='standard'
                  placeholder='Enter company name'
                  fullWidth
                  margin='normal'
                  value={field.value}
                  onChange={field.onChange}
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                  InputProps={{
                    ...params.InputProps,
                    type: "search",
                  }}
                />
              )}
            />
          )}
        />
        <Controller
          control={control}
          name='eik'
          defaultValue=''
          rules={{
            required: "Company EIK is required",
          }}
          render={({ field, fieldState }) => (
            <Autocomplete
              disableClearable={false}
              onChange={(event, item) => {
                field.onChange(item);
                companyChangeHandlerGeneric("eik", item, "name");
              }}
              value={field.value}
              freeSolo
              options={contractors.map((x) => x.eik)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  id='eik'
                  label='Company EIK'
                  variant='standard'
                  placeholder='Enter company EIK'
                  fullWidth
                  margin='normal'
                  value={field.value}
                  onChange={field.onChange}
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                  InputProps={{
                    ...params.InputProps,
                    type: "search",
                  }}
                />
              )}
            />
          )}
        />
        <Controller
          control={control}
          name='city'
          defaultValue=''
          rules={{ required: "City of registration is required" }}
          render={({ field, fieldState }) => (
            <TextField
              id='city'
              label='City of registration'
              variant='standard'
              placeholder='Enter city of registration'
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
        <Controller
          control={control}
          name='postalCode'
          defaultValue=''
          rules={{ required: "Postal code is required" }}
          render={({ field, fieldState }) => (
            <TextField
              id='postalCode'
              label='Postal code'
              variant='standard'
              placeholder='Enter postal code'
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
        <Controller
          control={control}
          name='addressLine'
          defaultValue=''
          rules={{ required: "Address line is required" }}
          render={({ field, fieldState }) => (
            <TextField
              id='addressLine'
              label='Address line'
              variant='standard'
              placeholder='Enter address line'
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
      </Fragment>
    );
  }
};
export default CounterpartyForm;
