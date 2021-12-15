import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Controller, useFormContext } from "react-hook-form";
// import Spinner from "../../../layout/Spinner";
import { TextField } from "@mui/material";
import { Box } from "@mui/system";

import AuthContext from "../../../../context/auth/authContext";
import UserContext from "../../../../context/user/userContext";
import Autocomplete from "@mui/material/Autocomplete";
import { format } from "date-fns";

import { stpCodes } from "../../../../utils/Constants";

const ItnForm = (props) => {
  const { city, postalCode, addressLine, startDate, endDate } = props.data;
  const { control, getValues, setValue, trigger, watch } = useFormContext();
  const userContext = useContext(UserContext);
  const authContext = useContext(AuthContext);
  const { isAuthenticated, verifyToken } = authContext;
  const {
    getAvlItns,
    startLoader,
    availableITNs,
    getStpCoeffs,
    isFreeItn,
    clearStp,
  } = userContext;
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    } else {
      verifyToken();
    }
    if (getValues()["itn"]) {
      itnChangeHandler(getValues()["itn"]);
    }
    // eslint-disable-next-line
  }, [isAuthenticated]);

  useEffect(() => {
    trigger(loadTypeChangeHandler(getValues()["loadType"]));
    // eslint-disable-next-line
  }, [watch("erp")]);

  const erpChangeHandler = (erp) => {
    setValue(
      "loadType",
      stpCodes.filter((x) => x.includes(getValues()["erp"]))[0],
      { shouldValidate: true }
    );
    setValue("itn", "");
  };
  const itnChangeHandler = (itn) => {
    const cezPattern = /^32Z1[A-Za-z0-9]{12}$/i;
    const eproPattern = /^32Z4[A-Za-z0-9]{12}$/i;
    const evnPattern = /^BG[A-Za-z0-9]{31}$/i;
    if (itn.match(cezPattern)) {
      setValue("erp", "CEZ", { shouldValidate: true });
      setValue("loadType", "CEZ_B1", { shouldValidate: true });
    } else if (itn.match(eproPattern)) {
      setValue("erp", "EPRO", { shouldValidate: true });
      setValue("loadType", "EPRO_B01", { shouldValidate: true });
    } else if (itn.match(evnPattern)) {
      setValue("erp", "EVN", { shouldValidate: true });
      setValue("loadType", "EVN_BD000", { shouldValidate: true });
    } else {
      setValue("erp", "CEZ", { shouldValidate: true });
      setValue("loadType", "CEZ_B1", { shouldValidate: true });
    }
    startLoader();
    getAvlItns({
      itn,
      startDate: `${format(new Date(startDate), "dd/MM/yyyy")}`,
      endDate: `${format(new Date(endDate), "dd/MM/yyyy")}`,
    });
  };

  const loadTypeChangeHandler = (loadType) => {
    startLoader();
    clearStp();
    getStpCoeffs(
      loadType,
      format(new Date(startDate), "dd/MM/yyyy"),
      format(new Date(endDate), "dd/MM/yyyy")
    );
  };

  return (
    <Box>
      <Controller
        control={control}
        name='itn'
        defaultValue=''
        rules={{
          required: "ITN is required",

          pattern: {
            value: /^32Z(?:1|4)[A-Za-z0-9]{12}$|^BG[A-Za-z0-9]{31}$/i,
            message: "Itn is not valid.",
          },
          validate: (value) =>
            isFreeItn || "This ITN has schedule for selected period already !",
        }}
        render={({ field, fieldState }) => (
          <Autocomplete
            disableClearable={true}
            freeSolo
            onBlurCapture={(item) => {
              // console.log(
              //   "🚀 ~ onBlurCapture ~ ItnForm ~ item",
              //   item.target.defaultValue
              // );
              itnChangeHandler(item.target.defaultValue);
            }}
            onChange={(event, item) => {
              field.onChange(item);
              itnChangeHandler(item);
            }}
            value={field.value}
            options={availableITNs}
            // options={[]}
            isOptionEqualToValue={(option, value) => option === value}
            renderInput={(params) => (
              <TextField
                className='create-contract-itn'
                {...params}
                id='itn'
                label='ITN'
                variant='standard'
                placeholder='Choose ITN'
                fullWidth
                margin='normal'
                value={field.value}
                onChange={field.onChange}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}

                // inputProps={{ readOnly: true }}
              />
            )}
          />
        )}
      />
      <Controller
        control={control}
        name='erp'
        defaultValue='CEZ'
        rules={{
          required: "ERP is required",
          validate: (value) =>
            ["CEZ", "EVN", "EPRO"].includes(value) || "Invalid ERP",
        }}
        render={({ field, fieldState }) => (
          <Autocomplete
            disableClearable={true}
            onChange={(event, item) => {
              field.onChange(item);
              erpChangeHandler(item);
            }}
            value={field.value}
            options={["CEZ", "EVN", "EPRO"]}
            renderInput={(params) => (
              <TextField
                {...params}
                id='erp'
                label='ERP'
                variant='standard'
                placeholder='Choose ERP'
                fullWidth
                margin='normal'
                value={field.value}
                onChange={field.onChange}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                // inputProps={{ readOnly: true }}
              />
            )}
          />
        )}
      />
      <Controller
        control={control}
        name='cityITN'
        defaultValue={city}
        rules={{ required: "City of ITN is required" }}
        render={({ field, fieldState }) => (
          <TextField
            id='cityITN'
            label='City of ITN'
            variant='standard'
            placeholder='Enter city of ITN'
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
        name='postalCodeITN'
        defaultValue={postalCode}
        rules={{ required: "Postal code is required" }}
        render={({ field, fieldState }) => (
          <TextField
            id='postalCodeITN'
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
        name='addressLineITN'
        defaultValue={addressLine}
        rules={{ required: "Address line is required" }}
        render={({ field, fieldState }) => (
          <TextField
            id='addressLineITN'
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
      <Controller
        control={control}
        name='loadType'
        defaultValue='CEZ_B1'
        rules={{
          required: "Load type is required",
          validate: (value) =>
            stpCodes
              .filter((x) => x.includes(getValues()["erp"]))
              .includes(value) || "Invalid Load type",
        }}
        render={({ field, fieldState }) => (
          <Autocomplete
            disableClearable={false}
            onChange={(event, item) => {
              field.onChange(item);
              loadTypeChangeHandler(item);
            }}
            value={field.value}
            options={stpCodes.filter((x) => x.includes(getValues()["erp"]))}
            renderInput={(params) => (
              <TextField
                {...params}
                id='loadType'
                label='Load type'
                variant='standard'
                placeholder='Choose load type'
                fullWidth
                margin='normal'
                value={field.value}
                onChange={field.onChange}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                // inputProps={{ readOnly: true }}
              />
            )}
          />
        )}
      />
    </Box>
  );
};
export default ItnForm;
