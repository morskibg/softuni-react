// import React, { useState, useContext, useEffect, Fragment } from "react";
// import { useNavigate, useLocation } from "react-router-dom";

// import { Controller, useFormContext } from "react-hook-form";
// import Spinner from "../../layout/Spinner";
// import { TextField, Typography } from "@mui/material";
// import AdapterDateFns from "@mui/lab/AdapterDateFns";
// import LocalizationProvider from "@mui/lab/LocalizationProvider";
// import { addDays, format, isAfter, isBefore, isValid } from "date-fns";

// import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
// import { Box } from "@mui/system";

// import AuthContext from "../../../context/auth/authContext";
// import AlertContext from "../../../context/alert/alertContext";

// import UserContext from "../../../context/user/userContext";
// import Autocomplete from "@mui/material/Autocomplete";

// import { stpCodes } from "../../../utils/Constants";
// import SummaryTable from "./SummaryTable";

// const CounterpartyForm = () => {
//   const { control, getValues, setValue, reset } = useFormContext();

//   const userContext = useContext(UserContext);
//   const { getAddresses, getContractors, contractors, loading, startLoader } =
//     userContext;
//   const authContext = useContext(AuthContext);
//   const { isAuthenticated, verifyToken, isGuest } = authContext;
//   const navigate = useNavigate();

//   useEffect(() => {
//     // if (!isAuthenticated | isGuest) {
//     //   navigate("/");
//     // } else {
//     //   verifyToken();
//     // }
//     startLoader();
//     getContractors();
//     startLoader();
//     getAddresses();
//     // eslint-disable-next-line
//   }, [isAuthenticated, isGuest]);

//   const companyChangeHandlerGeneric = (itemName, item, newValueName) => {
//     const selectedCompany = contractors.filter((x) => x[itemName] === item);
//     console.log(
//       "🚀 ~ file: Forms.js ~ line 30 ~ companyChangeHandlerGeneric ~ selectedCompany",
//       selectedCompany
//     );
//     let newValue = null;
//     if (selectedCompany.length > 0) {
//       newValue = selectedCompany[0][newValueName];
//       setValue(newValueName, newValue, { shouldValidate: true });
//       setValue("city", selectedCompany[0].address.city, {
//         shouldValidate: true,
//       });
//       setValue("postalCode", selectedCompany[0].address.postal_code, {
//         shouldValidate: true,
//       });
//       setValue("addressLine", selectedCompany[0].address.address_line, {
//         shouldValidate: true,
//       });
//     } else {
//       resetForm();
//     }
//   };

//   const resetForm = () => {
//     reset({
//       name: "",
//       eik: "",
//       city: "",
//       postalCode: "",
//       addressLine: "",
//     });
//   };
//   if (loading) {
//     return <Spinner />;
//   } else {
//     return (
//       <>
//         <Controller
//           control={control}
//           name='name'
//           defaultValue=''
//           rules={{ required: "Company name is required" }}
//           render={({ field, fieldState }) => (
//             <Autocomplete
//               disableClearable={false}
//               onChange={(event, item) => {
//                 field.onChange(item);
//                 companyChangeHandlerGeneric("name", item, "eik");
//               }}
//               value={field.value}
//               freeSolo
//               options={contractors.map((x) => x.name)}
//               renderInput={(params) => (
//                 <TextField
//                   {...params}
//                   id='first-name'
//                   label='Company name'
//                   variant='standard'
//                   placeholder='Enter company name'
//                   fullWidth
//                   margin='normal'
//                   value={field.value}
//                   onChange={field.onChange}
//                   error={!!fieldState.error}
//                   helperText={fieldState.error?.message}
//                   InputProps={{
//                     ...params.InputProps,
//                     type: "search",
//                   }}
//                 />
//               )}
//             />
//           )}
//         />
//         <Controller
//           control={control}
//           name='eik'
//           defaultValue=''
//           rules={{
//             required: "Company EIK is required",
//           }}
//           render={({ field, fieldState }) => (
//             <Autocomplete
//               disableClearable={false}
//               onChange={(event, item) => {
//                 field.onChange(item);
//                 companyChangeHandlerGeneric("eik", item, "name");
//               }}
//               value={field.value}
//               freeSolo
//               options={contractors.map((x) => x.eik)}
//               renderInput={(params) => (
//                 <TextField
//                   {...params}
//                   id='eik'
//                   label='Company EIK'
//                   variant='standard'
//                   placeholder='Enter company EIK'
//                   fullWidth
//                   margin='normal'
//                   value={field.value}
//                   onChange={field.onChange}
//                   error={!!fieldState.error}
//                   helperText={fieldState.error?.message}
//                   InputProps={{
//                     ...params.InputProps,
//                     type: "search",
//                   }}
//                 />
//               )}
//             />
//           )}
//         />
//         <Controller
//           control={control}
//           name='city'
//           defaultValue=''
//           rules={{ required: "City of registration is required" }}
//           render={({ field, fieldState }) => (
//             <TextField
//               id='city'
//               label='City of registration'
//               variant='standard'
//               placeholder='Enter city of registration'
//               fullWidth
//               margin='normal'
//               value={field.value}
//               onChange={field.onChange}
//               error={!!fieldState.error}
//               helperText={fieldState.error?.message}
//               {...field}
//             />
//           )}
//         />
//         <Controller
//           control={control}
//           name='postalCode'
//           defaultValue=''
//           rules={{ required: "Postal code is required" }}
//           render={({ field, fieldState }) => (
//             <TextField
//               id='postalCode'
//               label='Postal code'
//               variant='standard'
//               placeholder='Enter postal code'
//               fullWidth
//               margin='normal'
//               value={field.value}
//               onChange={field.onChange}
//               error={!!fieldState.error}
//               helperText={fieldState.error?.message}
//               {...field}
//             />
//           )}
//         />
//         <Controller
//           control={control}
//           name='addressLine'
//           defaultValue=''
//           rules={{ required: "Address line is required" }}
//           render={({ field, fieldState }) => (
//             <TextField
//               id='addressLine'
//               label='Address line'
//               variant='standard'
//               placeholder='Enter address line'
//               fullWidth
//               margin='normal'
//               value={field.value}
//               onChange={field.onChange}
//               error={!!fieldState.error}
//               helperText={fieldState.error?.message}
//               {...field}
//             />
//           )}
//         />
//       </>
//     );
//   }
// };
// const ContractForm = (props) => {
//   const { city, postalCode, addressLine } = props.data;
//   const userContext = useContext(UserContext);

//   const { getAvlItns, loading, startLoader, clearStp } = userContext;

//   const { control, getValues, setValue, trigger, watch } = useFormContext();
//   const authContext = useContext(AuthContext);
//   const { isAuthenticated, verifyToken, isGuest } = authContext;
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!isAuthenticated | isGuest) {
//       navigate("/");
//     } else {
//       verifyToken();
//     }
//   }, [isAuthenticated, isGuest]);

//   useEffect(() => {
//     getAvlItns({
//       startDate: `${format(new Date(getValues()["startDate"]), "dd/MM/yyyy")}`,
//       endDate: `${format(new Date(getValues()["endDate"]), "dd/MM/yyyy")}`,
//     });
//     trigger("startDate");
//     trigger("endDate");
//   }, [watch("endDate"), watch("startDate")]);

//   const dateChangeHandler = (date) => {
//     getAvlItns({
//       startDate: `${format(new Date(getValues()["startDate"]), "dd/MM/yyyy")}`,
//       endDate: `${format(new Date(getValues()["endDate"]), "dd/MM/yyyy")}`,
//     });
//   };

//   // const sdateChangeHandler = (date) => {
//   //   console.log("in sdateChangeHandler");
//   //   setValue("endDate", "", {});
//   // };

//   return (
//     <>
//       <Box className='contract-form'>
//         <Controller
//           control={control}
//           name='startDate'
//           defaultValue={addDays(Date.now(), 1)}
//           rules={{
//             required: "Contract start date is required",
//             validate: (value) =>
//               (isValid(value) &&
//                 isAfter(value, new Date(31, 12, 2020)) &&
//                 isBefore(value, getValues()["endDate"])) ||
//               (!isValid(value)
//                 ? "Invalid date"
//                 : "Date is not between 01/01/2021 and contract end date"),
//           }}
//           render={({ field, fieldState }) => (
//             <LocalizationProvider dateAdapter={AdapterDateFns}>
//               <DesktopDatePicker
//                 label='Contract start date'
//                 inputFormat='dd/MM/yyyy'
//                 value={field.value}
//                 onChange={(newValue) => {
//                   // setStartDateValue(newValue);
//                   field.onChange(newValue);
//                   dateChangeHandler();
//                 }}
//                 renderInput={(params) => (
//                   <TextField
//                     {...params}
//                     variant='standard'
//                     // value={field.value}
//                     onChange={field.onChange}
//                     error={!!fieldState.error}
//                     helperText={fieldState.error?.message}
//                     InputProps={{
//                       ...params.InputProps,
//                       type: "date",
//                     }}
//                     {...field}
//                   />
//                 )}
//               />
//             </LocalizationProvider>
//           )}
//         />

//         <Controller
//           control={control}
//           name='endDate'
//           defaultValue={addDays(Date.now(), 2)}
//           rules={{
//             required: "Contract end date is required",
//             validate: (value) =>
//               (isValid(value) && isAfter(value, getValues()["startDate"])) ||
//               (!isValid(value)
//                 ? "Invalid date"
//                 : "End date must be after start date"),
//           }}
//           render={({ field, fieldState }) => (
//             <LocalizationProvider dateAdapter={AdapterDateFns}>
//               <DesktopDatePicker
//                 label='Contract end date'
//                 inputFormat='dd/MM/yyyy'
//                 value={field.value}
//                 onChange={(newValue) => {
//                   // setStartDateValue(newValue);
//                   field.onChange(newValue);
//                   dateChangeHandler();
//                 }}
//                 renderInput={(params) => (
//                   <TextField
//                     {...params}
//                     sx={{ mt: "1rem" }}
//                     variant='standard'
//                     // value={field.value}
//                     onChange={field.onChange}
//                     error={!!fieldState.error}
//                     helperText={fieldState.error?.message}
//                     InputProps={{
//                       ...params.InputProps,
//                       type: "date",
//                     }}
//                     {...field}
//                   />
//                 )}
//               />
//             </LocalizationProvider>
//           )}
//         />
//         <Controller
//           control={control}
//           name='price'
//           defaultValue=''
//           rules={{
//             required: "Price is required",
//             min: { value: 0.01, message: "Min price is 0.01 BGN/kWh " },
//             max: { value: 2, message: "Max price is 2 BGN/kWh " },
//           }}
//           render={({ field, fieldState }) => (
//             <TextField
//               id='price'
//               label='Price (BGN/kWh)'
//               variant='standard'
//               placeholder='Enter price (BGN/kWh)'
//               fullWidth
//               margin='normal'
//               value={field.value}
//               onChange={field.onChange}
//               error={!!fieldState.error}
//               helperText={fieldState.error?.message}
//               {...field}
//             />
//           )}
//         />
//       </Box>
//     </>
//   );
// };
// const ItnForm = (props) => {
//   // const [parsedErp, setParsedErp]
//   const { city, postalCode, addressLine, startDate, endDate } = props.data;
//   const { control, getValues, setValue, trigger, watch } = useFormContext();
//   const userContext = useContext(UserContext);
//   const authContext = useContext(AuthContext);
//   const { isAuthenticated, verifyToken } = authContext;
//   const {
//     getAvlItns,
//     loading,
//     startLoader,
//     availableITNs,
//     getStpCoeffs,
//     isFreeItn,
//     clearStp,
//   } = userContext;
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!isAuthenticated) {
//       navigate("/");
//     } else {
//       verifyToken();
//     }
//     if (getValues()["itn"]) {
//       itnChangeHandler(getValues()["itn"]);
//     }
//   }, [isAuthenticated]);

//   // useEffect(() => {
//   //   console.log("trigger from itn change");
//   //   if (!isAuthenticated) {
//   //     navigate("/");
//   //   } else {
//   //     verifyToken();
//   //   }
//   //   // trigger(loadTypeChangeHandler(getValues()["loadType"]));
//   //   trigger(itnChangeHandler(getValues()["itn"]));
//   // }, [watch("itn"), isAuthenticated]);

//   useEffect(() => {
//     console.log("trigger from erp change");
//     trigger(loadTypeChangeHandler(getValues()["loadType"]));
//   }, [watch("erp")]);

//   // useEffect(() => {
//   //   console.log("trigger from itn change");
//   //   trigger(itnChangeHandler(getValues()["itn"]));
//   // }, [watch("itn")]);

//   const erpChangeHandler = (erp) => {
//     console.log("🚀 ~ file: Forms.js ~ line 369 ~ erpChangeHandler ~ erp", erp);

//     setValue(
//       "loadType",
//       stpCodes.filter((x) => x.includes(getValues()["erp"]))[0],
//       { shouldValidate: true }
//     );
//     setValue("itn", "");
//   };
//   const itnChangeHandler = (itn) => {
//     console.log("🚀 ~ file: Forms.js ~ line 383 ~ itnChangeHandler ~ itn", itn);
//     const cezPattern = /^32Z1.{12}$/i;
//     const eproPattern = /^32Z4.{12}$/i;
//     const evnPattern = /^BG.{31}$/i;
//     if (itn.match(cezPattern)) {
//       setValue("erp", "CEZ", { shouldValidate: true });
//       setValue("loadType", "CEZ_B1", { shouldValidate: true });
//     } else if (itn.match(eproPattern)) {
//       setValue("erp", "EPRO", { shouldValidate: true });
//       setValue("loadType", "EPRO_B01", { shouldValidate: true });
//     } else if (itn.match(evnPattern)) {
//       setValue("erp", "EVN", { shouldValidate: true });
//       setValue("loadType", "EVN_BD000", { shouldValidate: true });
//     } else {
//       setValue("erp", "CEZ", { shouldValidate: true });
//       setValue("loadType", "CEZ_B1", { shouldValidate: true });
//     }
//     startLoader();
//     getAvlItns({
//       itn,
//       startDate: `${format(new Date(startDate), "dd/MM/yyyy")}`,
//       endDate: `${format(new Date(endDate), "dd/MM/yyyy")}`,
//     });
//   };

//   const loadTypeChangeHandler = (loadType) => {
//     console.log("in loadTypeChangeHandler");
//     startLoader();
//     clearStp();
//     getStpCoeffs(
//       loadType,
//       format(new Date(startDate), "dd/MM/yyyy"),
//       format(new Date(endDate), "dd/MM/yyyy")
//     );
//   };
//   if (false) {
//     return (
//       <Fragment>
//         <Typography>dsdsd</Typography>
//         <Spinner />
//       </Fragment>
//     );
//   } else {
//     return (
//       <Box>
//         <Controller
//           control={control}
//           name='itn'
//           defaultValue=''
//           rules={{
//             required: "ITN is required",

//             pattern: {
//               value: /^32Z(?:1|4).{12}$|^BG.{31}$/i,
//               message: "Itn is not valid.",
//             },
//             validate: (value) =>
//               isFreeItn ||
//               "This ITN has schedule for selected period already !",
//           }}
//           render={({ field, fieldState }) => (
//             <Autocomplete
//               disableClearable={true}
//               freeSolo
//               // onPaste={(item) => {
//               //   console.log(
//               //     "🚀 ~ file: Forms.js ~ line 412 ~ ItnForm ~ item",
//               //     item.target.defaultValue
//               //   );
//               //   itnChangeHandler(item.target.defaultValue);
//               // }}
//               onBlurCapture={(item) => {
//                 console.log(
//                   "🚀 ~ file: Forms.js ~ line 412 ~ ItnForm ~ item",
//                   item.target.defaultValue
//                 );
//                 itnChangeHandler(item.target.defaultValue);
//               }}
//               onChange={(event, item) => {
//                 field.onChange(item);
//                 itnChangeHandler(item);
//               }}
//               value={field.value}
//               options={availableITNs}
//               // options={[]}
//               isOptionEqualToValue={(option, value) => option === value}
//               renderInput={(params) => (
//                 <TextField
//                   className='create-contract-itn'
//                   {...params}
//                   id='itn'
//                   label='ITN'
//                   variant='standard'
//                   placeholder='Choose ITN'
//                   fullWidth
//                   margin='normal'
//                   value={field.value}
//                   onChange={field.onChange}
//                   error={!!fieldState.error}
//                   helperText={fieldState.error?.message}

//                   // inputProps={{ readOnly: true }}
//                 />
//               )}
//             />
//           )}
//         />
//         <Controller
//           control={control}
//           name='erp'
//           defaultValue='CEZ'
//           rules={{
//             required: "ERP is required",
//             validate: (value) =>
//               ["CEZ", "EVN", "EPRO"].includes(value) || "Invalid ERP",
//           }}
//           render={({ field, fieldState }) => (
//             <Autocomplete
//               disableClearable={true}
//               onChange={(event, item) => {
//                 field.onChange(item);
//                 erpChangeHandler(item);
//               }}
//               value={field.value}
//               options={["CEZ", "EVN", "EPRO"]}
//               renderInput={(params) => (
//                 <TextField
//                   {...params}
//                   id='erp'
//                   label='ERP'
//                   variant='standard'
//                   placeholder='Choose ERP'
//                   fullWidth
//                   margin='normal'
//                   value={field.value}
//                   onChange={field.onChange}
//                   error={!!fieldState.error}
//                   helperText={fieldState.error?.message}
//                   // inputProps={{ readOnly: true }}
//                 />
//               )}
//             />
//           )}
//         />
//         <Controller
//           control={control}
//           name='cityITN'
//           defaultValue={city}
//           rules={{ required: "City of ITN is required" }}
//           render={({ field, fieldState }) => (
//             <TextField
//               id='cityITN'
//               label='City of ITN'
//               variant='standard'
//               placeholder='Enter city of ITN'
//               fullWidth
//               margin='normal'
//               value={field.value}
//               onChange={field.onChange}
//               error={!!fieldState.error}
//               helperText={fieldState.error?.message}
//               {...field}
//             />
//           )}
//         />
//         <Controller
//           control={control}
//           name='postalCodeITN'
//           defaultValue={postalCode}
//           rules={{ required: "Postal code is required" }}
//           render={({ field, fieldState }) => (
//             <TextField
//               id='postalCodeITN'
//               label='Postal code'
//               variant='standard'
//               placeholder='Enter postal code'
//               fullWidth
//               margin='normal'
//               value={field.value}
//               onChange={field.onChange}
//               error={!!fieldState.error}
//               helperText={fieldState.error?.message}
//               {...field}
//             />
//           )}
//         />
//         <Controller
//           control={control}
//           name='addressLineITN'
//           defaultValue={addressLine}
//           rules={{ required: "Address line is required" }}
//           render={({ field, fieldState }) => (
//             <TextField
//               id='addressLineITN'
//               label='Address line'
//               variant='standard'
//               placeholder='Enter address line'
//               fullWidth
//               margin='normal'
//               value={field.value}
//               onChange={field.onChange}
//               error={!!fieldState.error}
//               helperText={fieldState.error?.message}
//               {...field}
//             />
//           )}
//         />
//         <Controller
//           control={control}
//           name='loadType'
//           defaultValue='CEZ_B1'
//           rules={{
//             required: "Load type is required",
//             validate: (value) =>
//               stpCodes
//                 .filter((x) => x.includes(getValues()["erp"]))
//                 .includes(value) || "Invalid Load type",
//           }}
//           render={({ field, fieldState }) => (
//             <Autocomplete
//               disableClearable={false}
//               onChange={(event, item) => {
//                 field.onChange(item);
//                 loadTypeChangeHandler(item);
//               }}
//               value={field.value}
//               options={stpCodes.filter((x) => x.includes(getValues()["erp"]))}
//               renderInput={(params) => (
//                 <TextField
//                   {...params}
//                   id='loadType'
//                   label='Load type'
//                   variant='standard'
//                   placeholder='Choose load type'
//                   fullWidth
//                   margin='normal'
//                   value={field.value}
//                   onChange={field.onChange}
//                   error={!!fieldState.error}
//                   helperText={fieldState.error?.message}
//                   // inputProps={{ readOnly: true }}
//                 />
//               )}
//             />
//           )}
//         />
//       </Box>
//     );
//   }
// };
// const ConfirmForm = (props) => {
//   const { control, setValue } = useFormContext();

//   // useEffect(() => {
//   //   const str = `Company name : ${companyName}
//   //   City of registration : ${city}
//   //   Address of registration : ${addressLine}
//   //   Postal code of registration : ${postalCode}
//   //   Contract start date : ${format(new Date(startDate), "dd/MM/yyyy")}
//   //   Contract end date : ${format(new Date(endDate), "dd/MM/yyyy")}
//   //   Contract price per MWh in BGN : ${price} BGN/MWh
//   //   `;
//   //   console.log(
//   //     "🚀 ~ file: CreateContract.js ~ line 456 ~ useEffect ~ str",
//   //     str
//   //   );
//   //   setValue("summary", str);
//   // }, []);

//   return (
//     <>
//       <SummaryTable props={props.data} />
//     </>
//   );
// };

// export { CounterpartyForm, ContractForm, ItnForm, ConfirmForm };

// // export const FormOne = ({ formContent }) => {
// //   const methods = useFormContext();
// //   const { reset, register } = methods;
// //   const { control } = useFormContext();

// //   const authContext = useContext(AuthContext);
// //   const alertContext = useContext(AlertContext);
// //   const userContext = useContext(UserContext);

// //   const { isGuest } = authContext;
// //   const { setAlert } = alertContext;
// //   const { getAddresses, getContractors } = userContext;
// //   const navigate = useNavigate();
// //   const { addresses, contractors } = userContext;

// //   useEffect(() => {
// //     console.log("loading .....");
// //     if (authContext.error || userContext.error) {
// //       const alert = authContext.error ?? userContext.error;
// //       setAlert(alert.msg, alert.type);
// //       authContext.clearErrors();
// //       userContext.clearErrors();
// //     }
// //     if (isGuest) {
// //       navigate("/login");
// //     }
// //     getAddresses();
// //     getContractors();
// //     // return () => {
// //     //   console.log("EXIIIIIIIIIIIIIIIIIIIIIIIIIIIIIT --->", activeStep);
// //     // };
// //   }, [isGuest]);

// //   return (
// //     <form>
// //       <Controller
// //         control={control}
// //         name='companyName'
// //         defaultValue=''
// //         rules={{ required: "Company name is required" }}
// //         render={({ field, fieldState }) => (
// //           <Autocomplete
// //             // onChange={(event, item) => {
// //             //   field.onChange(item);
// //             // }}
// //             // value={field.value}
// //             freeSolo
// //             disableClearable
// //             options={contractors.map((x) => x.name)}
// //             renderInput={(params) => (
// //               <TextField
// //                 {...params}
// //                 label='Company name'
// //                 variant='standard'
// //                 placeholder='Enter company name'
// //                 fullWidth
// //                 margin='normal'
// //                 value={field.value}
// //                 onChange={field.onChange}
// //                 error={!!fieldState.error}
// //                 helperText={fieldState.error?.message}
// //                 InputProps={{
// //                   ...params.InputProps,
// //                   type: "search",
// //                 }}
// //               />
// //             )}
// //           />
// //         )}
// //       />
// //       {/* <input
// //         name='example'
// //         defaultValue='test'
// //         {...register("message", {
// //           required: "Required",
// //         })}
// //         // ref={register({ required: true, minLength: 2 })}
// //       /> */}
// //     </form>
// //   );
// // };

// // export const FormTwo = ({ formContent }) => {
// //   const methods = useFormContext();
// //   const { reset, register } = methods;
// //   const { control } = useFormContext();

// //   useEffect(() => {
// //     reset({ ...formContent.two }, { errors: true });
// //   }, []);

// //   return (
// //     <form>
// //       <Controller
// //         control={control}
// //         name='city'
// //         defaultValue=''
// //         rules={{ required: "City of registration is required" }}
// //         render={({ field, fieldState }) => (
// //           <TextField
// //             id='city'
// //             label='City of registration'
// //             variant='standard'
// //             placeholder='Enter city of registration'
// //             fullWidth
// //             margin='normal'
// //             // {...register("message", {
// //             //   required: "Required",
// //             // })}
// //             // value={field.value}
// //             // onChange={field.onChange}
// //             // error={!!fieldState.error}
// //             // helperText={fieldState.error?.message}
// //           />
// //         )}
// //       />
// //       {/* <input
// //           name='example'
// //           defaultValue='test'
// //           {...register("message", {
// //             required: "Required",
// //           })}
// //           // ref={register({ required: true, minLength: 2 })}
// //         /> */}
// //     </form>
// //   );
// // };

// // export const FormThree = ({ formContent }) => {
// //   const methods = useFormContext();
// //   const { reset, register } = methods;
// //   const { control } = useFormContext();

// //   useEffect(() => {
// //     reset({ ...formContent.three }, { errors: true });
// //   }, []);

// //   return (
// //     <form>
// //       <Controller
// //         control={control}
// //         name='city'
// //         defaultValue=''
// //         rules={{ required: "City of registration is required" }}
// //         render={({ field, fieldState }) => (
// //           <TextField
// //             id='city'
// //             label='City of registration'
// //             variant='standard'
// //             // placeholder='Enter city of registration'
// //             // fullWidth
// //             // margin='normal'
// //             // {...register("message", {
// //             //   required: "Required",
// //             // })}
// //             // value={field.value}
// //             // onChange={field.onChange}
// //             // error={!!fieldState.error}
// //             // helperText={fieldState.error?.message}
// //           />
// //         )}
// //       />
// //       {/* <input
// //           name='example'
// //           defaultValue='test'
// //           {...register("message", {
// //             required: "Required",
// //           })}
// //           // ref={register({ required: true, minLength: 2 })}
// //         /> */}
// //     </form>
// //   );
// // };

// // // export const FormTwo = ({ formContent }) => {
// // //   const methods = useFormContext();
// // //   const { reset, register } = methods;

// // //   useEffect(() => {
// // //     reset({ ...formContent.two }, { errors: true });
// // //   }, []);

// // //   return (
// // //     <form>
// // //       <input
// // //         name='example'
// // //         defaultValue='test'
// // //         {...register("message", {
// // //           required: "Required",
// // //         })}
// // //         // ref={register({ required: true, maxLength: 20 })}
// // //       />
// // //     </form>
// // //   );
// // // };

// // // export const FormThree = ({ formContent }) => {
// // //   const methods = useFormContext();
// // //   const { reset, register } = methods;

// // //   useEffect(() => {
// // //     reset({ ...formContent.three }, { errors: true });
// // //   }, []);

// // //   return (
// // //     <form>
// // //       <input
// // //         name='example2'
// // //         defaultValue='test'
// // //         {...register("message", {
// // //           required: "Required",
// // //         })}
// // //         // ref={register({ required: true, maxLength: 20 })}
// // //       />
// // //     </form>
// // //   );
// // // };
