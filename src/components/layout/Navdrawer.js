import React, { Fragment, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";

import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import Button from "@mui/material/Button";
// import PowerIcon from "@mui/icons-material/Power";
import BoltIcon from "@mui/icons-material/Bolt";
import CreateUserIcon from "@mui/icons-material/PersonAdd";
import ManageUsersIcon from "@mui/icons-material/PeopleAlt";
import LogoutIcon from "@mui/icons-material/Logout";
import DarkModeIcon from "@mui/icons-material/Brightness4";
import LightModeIcon from "@mui/icons-material/Brightness7";
// import CreateIcon from "@mui/icons-material/Create";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";

import AuthContext from "../../context/auth/authContext";
import AlertContext from "../../context/alert/alertContext";
// import AdminContext from "../../context/admin/adminContext";
import ThemeContext from "../../context/theme/themeContext";
import useAdminGuard from "../../hooks/useAdminGuard";
import useUserGuard from "../../hooks/useUserGuard";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),

  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  backgroundColor: "#424242",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const Navdrawer = (props) => {
  const hasUserPermission = useUserGuard();
  const hasAdminPermission = useAdminGuard();
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);
  // const adminContext = useContext(AdminContext);
  const themeContext = useContext(ThemeContext);

  const { setAlert } = alertContext;
  const { isAuthenticated, user } = authContext;

  // const { getUsers, setLoader } = adminContext;
  const { toggle, themeMode } = themeContext;

  const navigate = useNavigate();

  const theme = useTheme();

  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleManageUsers = () => {
    navigate("/admin/users");
  };

  const menuItems = [
    {
      text: "Create Contract",
      icon: <AddIcon />,
      isDisabled: !(hasUserPermission || hasAdminPermission),
      onClick: () => {
        if (!hasUserPermission) {
          setAlert("Registered user only !", "danger");
        } else {
          navigate("create_contract");
        }
      },
    },
    {
      text: "Edit Contract",
      icon: <EditIcon />,
      isDisabled: !(hasUserPermission || hasAdminPermission),
      onClick: () => {
        if (!hasUserPermission) {
          setAlert("Registered user only !", "danger");
        } else {
          navigate("redact_contract");
        }
      },
    },
    // {
    //   text: "Third",
    //   icon: <MailIcon />,
    //   isDisabled: false,
    // },
    {
      text: "Toogle Theme",
      icon: themeMode === "light" ? <DarkModeIcon /> : <LightModeIcon />,
      onClick: toggle,
      isDisabled: false,
    },
  ];

  const adminItems = [
    {
      text: "Create User",
      icon: <CreateUserIcon />,
      onClick: () => navigate("/admin/register"),
    },
    {
      text: "Manage Users",
      icon: <ManageUsersIcon />,
      // onClick: loadUsers,
      onClick: handleManageUsers,
    },
  ];
  if (!isAuthenticated) {
    return null;
  }
  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position='sticky' open={open} enableColorOnDark>
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            onClick={handleDrawerOpen}
            edge='start'
            sx={{
              marginRight: "36px",
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <BoltIcon sx={{ cursor: "pointer" }} onClick={() => navigate("/")} />
          <Typography
            onClick={() => navigate("/")}
            color='inherit'
            variant='h6'
            component='div'
            sx={{ flexGrow: 1, cursor: "pointer" }}
          >
            Power App
          </Typography>
          <Typography variant='h6'>Welcome, {user?.full_name ?? ""}</Typography>
          {isAuthenticated ? (
            <Button
              color='inherit'
              variant='text'
              endIcon={<LogoutIcon />}
              component={Link}
              to='logout'
            ></Button>
          ) : (
            // <Button color='inherit' alt='logo' component={Link} to='logout'>
            //   <LogoutIcon />
            // </Button>
            <Button color='inherit' component={Link} to='login'>
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <Drawer variant='permanent' open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {menuItems.map((item) => (
            <ListItem
              button
              disabled={item.isDisabled}
              key={item.text}
              onClick={item.onClick}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text}></ListItemText>
            </ListItem>
          ))}
        </List>

        <Divider />
        {hasAdminPermission && (
          <Fragment>
            <Typography variant='h7' mt={2} ml={1}>
              Admin
            </Typography>
            <List>
              {adminItems.map((item) => (
                <ListItem button key={item.text} onClick={item.onClick}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text}></ListItemText>
                </ListItem>
              ))}
            </List>
          </Fragment>
        )}

        <List
          sx={{
            display: "flex",
            flexGrow: 1,
            flexDirection: "column",
            justifyContent: "flex-end",
            // position: "absolute",
            // bottom: "0",
          }}
        >
          <ListItem button key={"logout"} onClick={() => navigate("logout")}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary={"Logout"}></ListItemText>
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
};

export default Navdrawer;
