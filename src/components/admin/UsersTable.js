import React, { useContext, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";

import AdminContext from "../../context/admin/adminContext";
import { Box } from "@mui/system";

import "./UsersTable.css";
import { Typography } from "@mui/material";
import RegisterIcon from "@mui/icons-material/Storage";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ClearIcon from "@mui/icons-material/LayersClear";
import { Button, ButtonGroup } from "@mui/material";

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
  const adminContext = useContext(AdminContext);
  const { users } = adminContext;

  const [selectedRows, setSelectedRows] = useState();
  const createRows = () => {
    const res = users.map((user) =>
      Object.assign({}, user, {
        is_active: user.is_active ? "yes" : "no",
        is_superuser: user.is_superuser ? "yes" : "no",
      })
    );

    return res;
  };

  const onDelete = () => {
    const selectedEmails = selectedRows.map((row) => row.email);
    console.log(selectedEmails);
  };
  const rows = createRows();
  return (
    <Box className='users-table-container'>
      <Box className='users-table'>
        <Typography variant='h1'> Users Table</Typography>
        {/* <div style={{ flexGrow: 1 }}> */}
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          onSelectionModelChange={(ids) => {
            const selectedIDs = new Set(ids);
            const selectedRowData = rows.filter((row) =>
              selectedIDs.has(row.id)
            );
            setSelectedRows(selectedRowData);
          }}
        />
        <ButtonGroup
          variant='contained'
          aria-label='outlined primary button group'
        >
          <Button startIcon={<ArrowBackIcon />}>Cancel</Button>
          <Button startIcon={<ClearIcon />} onClick={onDelete}>
            Delete
          </Button>
          <Button
            type='submit'
            variant='contained'
            endIcon={<RegisterIcon />}
            color={"primary"}
            // onClick={}
          >
            Modify
          </Button>
        </ButtonGroup>
      </Box>
    </Box>
  );
};

export default UsersTable;
