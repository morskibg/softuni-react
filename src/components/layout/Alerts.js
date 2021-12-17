import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext } from "react";
import AlertContext from "../../context/alert/alertContext";
import "./Alert.css";

const Alerts = () => {
  const alertContext = useContext(AlertContext);

  // if (alertContext.alerts.length > 0) {
  //   alertContext.alerts.map((alert) => console.log("ALEEEEEEEEERT--->", alert));
  // }
  return (
    alertContext.alerts.length > 0 &&
    alertContext.alerts.map((alert) => (
      <Box key={alert.id} className={`alert alert-${alert.type}`}>
        <Typography>{alert.msg}</Typography>
      </Box>
    ))
  );
};

export default Alerts;
