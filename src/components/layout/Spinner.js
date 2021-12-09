import React from "react";
import spinner from "../../assets/spinner.gif";
import { Box } from "@mui/system";
import "./Spinner.css";

const SpinnerToExport = () => (
  <Box className='spinner-container'>
    <img src={spinner} alt='Loading...' />
  </Box>
);
export default SpinnerToExport;
