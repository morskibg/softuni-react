import React, { useContext, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/system";

import "./UsersTable.css";
import { Typography } from "@mui/material";
import RegisterIcon from "@mui/icons-material/Storage";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ClearIcon from "@mui/icons-material/LayersClear";
import { Button, ButtonGroup } from "@mui/material";

import AdminContext from "../../context/admin/adminContext";
import AuthContext from "../../context/auth/authContext";

import ModifyUser from "./ModifyUser";
import ConfirmDialog from "../layout/ConfirmDialog";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "email", headerName: "Email", width: 160 },
  { field: "full_name", headerName: "Full name", width: 150 },
  { field: "is_active", headerName: "Is active", width: 130 },
  { field: "is_superuser", headerName: "Is Admin", width: 130 },
  { field: "creator_email", headerName: "Creator email", width: 130 },
  { field: "last_seen", headerName: "Last seen", width: 130 },
  { field: "last_updated", headerName: "Last updated", width: 130 },
];

const UsersTable = () => {
  const navigate = useNavigate();
  const adminContext = useContext(AdminContext);
  const { users, deleteUser, setCurrentUser, clearCurrUser } = adminContext;
  const authContext = useContext(AuthContext);
  const { verifyToken } = authContext;

  const [selectedRows, setSelectedRows] = useState();
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [modConfirmDialog, setConfirmDialog] = useState(false);
  const [modUserDialog, setModUserDialog] = useState(false);

  // useEffect(() => {
  //   console.log("in user table , hasPermission --->", hasPermission);
  //   if (!hasPermission) {
  //     navigate("/");
  //   }
  //   // eslint-disable-next-line
  // }, [hasPermission]);

  // useEffect(() => {
  //   if (!isAuthenticated | isGuest | !isAdmin) {
  //     navigate("/");
  //   }
  //   // eslint-disable-next-line
  // }, [isAdmin, isGuest, isAuthenticated]);

  const createRows = () => {
    const res = users.map((user) =>
      Object.assign({}, user, {
        is_active: user.is_active ? "yes" : "no",
        is_superuser: user.is_superuser ? "yes" : "no",
      })
    );

    return res;
  };

  const handleDelete = () => {
    const selectedEmails = selectedRows.map((row) => row.email);

    selectedEmails.map((x) => deleteUser(x));
  };

  const handleModify = () => {
    setConfirmDialog(true);
  };
  const closeAfterModify = () => {
    setModUserDialog(false);
    setBtnDisabled(true);
  };
  // const handleModify = () => {
  //   setModUserDialog(true);
  // };

  const handleSelectionModelChange = (ids) => {
    verifyToken();
    const selectedIDs = new Set(ids);

    const selectedRowData = rows.filter((row) => selectedIDs.has(row.id));
    setSelectedRows(selectedRowData);
    const selectedUser = users.filter(
      (x) => x.id === [...selectedIDs].pop()
    )[0];

    if (selectedIDs.size !== 0) {
      setCurrentUser(selectedUser);
      setBtnDisabled(false);
    } else {
      clearCurrUser();
      setBtnDisabled(true);
    }
  };

  const rows = createRows();

  const handleConfirmModify = () => {
    setConfirmDialog(false);
    setModUserDialog(true);
  };

  const handleCancelModify = () => {
    setConfirmDialog(false);
    setBtnDisabled(true);
  };

  if (modConfirmDialog) {
    return (
      <ConfirmDialog
        handleConfirm={handleConfirmModify}
        handleCancel={handleCancelModify}
      />
    );
  }
  if (modUserDialog) {
    return <ModifyUser handleModify={closeAfterModify} />;
  } else {
    return (
      <Box className='users-table-container'>
        <Box className='users-table'>
          <Typography variant='h1'> Users Table</Typography>
          {/* <div style={{ flexGrow: 1 }}> */}
          <DataGrid
            className='user-table-grid'
            sx={{ color: "primary" }}
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
            onSelectionModelChange={handleSelectionModelChange}
          />
          <ButtonGroup
            variant='contained'
            aria-label='outlined primary button group'
          >
            <Button startIcon={<ArrowBackIcon />} onClick={() => navigate("/")}>
              Cancel
            </Button>
            <Button
              type='submit'
              variant='contained'
              endIcon={<RegisterIcon />}
              color={"primary"}
              onClick={handleModify}
              disabled={btnDisabled}
            >
              Modify
            </Button>
            <Button
              startIcon={<ClearIcon />}
              onClick={handleDelete}
              disabled={btnDisabled}
            >
              Delete
            </Button>
          </ButtonGroup>
        </Box>
      </Box>
    );
  }
};

export default UsersTable;
