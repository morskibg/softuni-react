import React, { useContext, useEffect, Fragment } from "react";
// import { useNavigate } from "react-router-dom";

import { Controller, useFormContext } from "react-hook-form";
import Spinner from "../../../layout/Spinner";
import { TextField } from "@mui/material";

import AuthContext from "../../../../context/auth/authContext";

import UserContext from "../../../../context/user/userContext";
import Autocomplete from "@mui/material/Autocomplete";

const CounterpartyForm = () => {
  const { control, setValue } = useFormContext();

  const userContext = useContext(UserContext);
  const {
    getAddresses,
    getContractors,
    contractors,
    loading,
    startLoader,
    selectedContract,
  } = userContext;
  const authContext = useContext(AuthContext);
  const { isAuthenticated, isGuest } = authContext;

  useEffect(() => {
    if (!selectedContract) {
      setValue("name", "");
      setValue("eik", "");
      setValue("city", "");
      setValue("postalCode", "");
      setValue("addressLine", "");
    } else {
      const { name, eik } = selectedContract.contractor;
      const { city, postal_code, address_line } =
        selectedContract.contractor.address;
      setValue("name", name, {
        shouldValidate: true,
      });
      setValue("eik", eik, {
        shouldValidate: true,
      });
      setValue("city", city, {
        shouldValidate: true,
      });
      setValue("postalCode", postal_code, {
        shouldValidate: true,
      });
      setValue("addressLine", address_line, {
        shouldValidate: true,
      });
    }
    // eslint-disable-next-line
  }, [selectedContract]);

  useEffect(() => {
    startLoader();
    getContractors();
    startLoader();
    getAddresses();

    // eslint-disable-next-line
  }, [isAuthenticated, isGuest]);

  const companyChangeHandlerGeneric = (itemName, item, newValueName) => {
    // console.log("in companyChangeHandlerGeneric");
    const selectedCompany = contractors.filter((x) => x[itemName] === item);
    // console.log(
    //   "🚀 ~ file: CounterpartyForm.js ~ line 82 ~ companyChangeHandlerGeneric ~ selectedCompany",
    //   selectedCompany
    // );
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
    }
  };

  if (loading) {
    return <Spinner />;
  } else {
    return (
      <Fragment>
        <Controller
          control={control}
          name='name'
          defaultValue={selectedContract?.name || ""}
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
              options={contractors
                .map((x) => x.name)
                .filter((name, index, arr) => arr.indexOf(name) === index)}
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
              options={contractors
                .map((x) => x.eik)
                .filter((eik, index, arr) => arr.indexOf(eik) === index)}
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
