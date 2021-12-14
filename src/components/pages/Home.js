import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "../layout/Spinner";
import AuthContext from "../../context/auth/authContext";
import AlertContext from "../../context/alert/alertContext";
import AdminContext from "../../context/admin/adminContext";
import UserContext from "../../context/user/userContext";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Typography } from "@mui/material";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import { Box } from "@mui/system";
import OutlinedInput from "@mui/material/OutlinedInput";
import { useTheme } from "@mui/material/styles";
import FormControl from "@mui/material/FormControl";
import { TextField } from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { addDays } from "date-fns";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";

import "./Home.css";
const markets = ["BG", "GR", "RO", "HU", "DE"];
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const Home = (props) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);
  const adminContext = useContext(AdminContext);
  const userContext = useContext(UserContext);

  const { setAlert } = alertContext;
  const { isAdmin, isGuest, isAuthenticated, verifyToken } = authContext;

  const { loading } = adminContext;
  const { getSpotData, spots } = userContext;

  const [selectedMarkets, setSelectedMarkets] = useState(["BG"]);
  const [sValue, setSValue] = useState(addDays(Date.now(), -2));
  const [eValue, setEValue] = useState(addDays(Date.now(), 2));

  useEffect(() => {
    if (!isAuthenticated && !isGuest) {
      navigate("login");
    } else {
      verifyToken();
    }
    // eslint-disable-next-line
  }, [isAuthenticated, isGuest]);

  useEffect(() => {
    if (authContext.error || adminContext.error || userContext.error) {
      const alert =
        authContext.error ?? adminContext.error ?? userContext.error;

      setAlert(alert.msg, alert.type);
      authContext.clearErrors();
      adminContext.clearErrors();
      userContext.clearErrors();
    }
    // eslint-disable-next-line
  }, [
    isAdmin,
    isGuest,
    adminContext.error,
    authContext.error,
    userContext.error,
  ]);

  useEffect(() => {
    getSpotData(sValue, eValue);

    // eslint-disable-next-line
  }, [sValue, eValue]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedMarkets(typeof value === "string" ? value.split(",") : value);
  };
  const handleSDate = (e) => {
    setSValue(e);
  };
  const handleEDate = (e) => {
    setEValue(e);
  };

  if (loading) {
    return <Spinner />;
  } else {
    return (
      <Box className='with-drawer'>
        <Typography className='spot-text' variant='h3'>
          Electricity Spot Prices
        </Typography>
        <FormControl variant='standard' sx={{ minWidth: 160 }}>
          <InputLabel id='spots'>Spot Market</InputLabel>
          <Select
            id='spots-select'
            multiple
            value={selectedMarkets}
            onChange={handleChange}
            input={<OutlinedInput label='Tag' />}
            renderValue={(selected) => selected.join(", ")}
            MenuProps={MenuProps}
          >
            {markets.map((x) => (
              <MenuItem key={x} value={x}>
                <Checkbox checked={selectedMarkets.indexOf(x) > -1} />
                <ListItemText primary={x} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DesktopDatePicker
            className='spot-date'
            label='Start'
            inputFormat='dd/MM/yyyy'
            value={sValue}
            onChange={handleSDate}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DesktopDatePicker
            label='End'
            inputFormat='dd/MM/yyyy'
            value={eValue}
            onChange={handleEDate}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>

        <ResponsiveContainer width='100%' aspect={3}>
          <LineChart
            width={500}
            height={400}
            data={spots ?? []}
            margin={{
              top: 10,
              right: 30,
              left: 10,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis
              dataKey='eet'
              height={100}
              label={{
                height: 10,
                stroke: theme.palette.primary.main,
                fontSize: 20,

                strokeWidth: 2,
                value: "Time zone: EET",

                textAnchor: "middle",
              }}
            />
            <YAxis
              tick={{ fontSize: 20 }}
              height={100}
              label={{
                height: 10,
                stroke: theme.palette.primary.main,
                fontSize: 20,

                strokeWidth: 2,
                value: "EUR/MWh",
                angle: -90,
                position: "insideLeft",
                textAnchor: "middle",
              }}
            />
            <Tooltip />
            <Legend verticalAlign='top' height={36} />
            {selectedMarkets.includes("BG") && (
              <Line
                type='linear'
                dataKey='BG_Pr'
                stroke={theme.palette.primary.main}
                strokeWidth={5}
              />
            )}
            {selectedMarkets.includes("GR") && (
              <Line
                type='linear'
                dataKey='GR_Pr'
                stroke={theme.palette.secondary.main}
                strokeWidth={3}
              />
            )}
            {selectedMarkets.includes("DE") && (
              <Line
                type='linear'
                dataKey='DE_Pr'
                stroke={theme.palette.success.main}
                strokeWidth={3}
              />
            )}
            {selectedMarkets.includes("RO") && (
              <Line
                type='linear'
                dataKey='RO_Pr'
                stroke={theme.palette.lineChart.fourth}
                strokeWidth={3}
              />
            )}
            {selectedMarkets.includes("HU") && (
              <Line
                type='linear'
                dataKey='HU_Pr'
                stroke={theme.palette.lineChart.fifth}
                strokeWidth={3}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </Box>
    );
  }
};

export default Home;
