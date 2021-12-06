import React, { useContext, useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";

import AdminContext from "../../context/admin/adminContext";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/system";

import "./UsersTable.css";
import { Typography } from "@mui/material";
import RegisterIcon from "@mui/icons-material/Storage";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ClearIcon from "@mui/icons-material/LayersClear";
import { Button, ButtonGroup } from "@mui/material";
import ModifyUser from "./ModifyUser";

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

  const [reload, setReload] = useState(false);

  const [selectedRows, setSelectedRows] = useState();
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [modUserDialog, setModUserDialog] = useState(false);

  // useEffect(() => {
  //   console.log("in USERS TABLE USE EFF");
  //   if (modUserDialog) {
  //     setModUserDialog(false);
  //   }
  // }, []);

  const reloadAfterModify = () => {
    setModUserDialog(false);
  };

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
    // const selectedEmail = selectedRows.map((row) => row.email)[0];

    setModUserDialog(true);
  };

  const handleSelectionModelChange = (ids) => {
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

  if (modUserDialog) {
    return <ModifyUser reloadCallback={reloadAfterModify} />;
  } else {
    console.log("returning from users table");
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
