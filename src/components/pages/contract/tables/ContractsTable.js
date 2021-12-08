import React, { useContext, useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";

import AuthContext from "../../../../context/auth/authContext";
import UserContext from "../../../../context/user/userContext";

import { useNavigate } from "react-router-dom";
import { Box } from "@mui/system";

import "../css/CreateContract.css";
import { Typography } from "@mui/material";
import RegisterIcon from "@mui/icons-material/Storage";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ClearIcon from "@mui/icons-material/LayersClear";
import { Button, ButtonGroup } from "@mui/material";
// import ModifyUser from "./ModifyUser";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "email", headerName: "Email", width: 160 },
  // { field: "full_name", headerName: "Full name", width: 150 },
  // { field: "is_active", headerName: "Is active", width: 130 },
  // { field: "is_superuser", headerName: "Is Admin", width: 130 },
  // { field: "creator_email", headerName: "Creator email", width: 130 },
  // { field: "last_seen", headerName: "Last seen", width: 130 },
  // { field: "last_updated", headerName: "Last updated", width: 130 },
];

const ContractsTable = () => {
  const authContext = useContext(AuthContext);
  const userContext = useContext(UserContext);
  const { isAuthenticated, verifyToken, isGuest } = authContext;
  const { contracts, loading, startLoader } = userContext;
  const navigate = useNavigate();

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
    const res = contracts.map((x) =>
      Object.assign(
        {},
        {
          id: x.id,
          contractor: x.contractor.name,
          startDate: x.start_date,
          endDate: x.end_date,
        }
      )
    );

    console.log(
      "🚀 ~ file: ContractsTable.js ~ line 63 ~ createRows ~ res",
      res
    );
    return res;
  };

  const handleDelete = () => {
    console.log("in handleDelete");
    // const selectedEmails = selectedRows.map((row) => row.email);

    // selectedEmails.map((x) => deleteUser(x));
  };

  const handleModify = () => {
    console.log("in handleModify");
    // const selectedEmail = selectedRows.map((row) => row.email)[0];

    // setModUserDialog(true);
  };

  const handleSelectionModelChange = (ids) => {
    const selectedIDs = new Set(ids);

    const selectedRowData = rows.filter((row) => selectedIDs.has(row.id));
    setSelectedRows(selectedRowData);
    const selectedContract = contracts.filter(
      (x) => x.id === [...selectedIDs].pop()
    )[0];

    // if (selectedIDs.size !== 0) {
    //   setCurrentUser(selectedUser);
    //   setBtnDisabled(false);
    // } else {
    //   clearCurrUser();
    //   setBtnDisabled(true);
    // }
  };
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "firstName", headerName: "First name", width: 130 },
    { field: "lastName", headerName: "Last name", width: 130 },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      width: 90,
    },
    {
      field: "fullName",
      headerName: "Full name",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
      valueGetter: (params) =>
        `${params.getValue(params.id, "firstName") || ""} ${
          params.getValue(params.id, "lastName") || ""
        }`,
    },
  ];

  const rows = [
    { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
    { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
    { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
    { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
    { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
    { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
    { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
    { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
    { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
  ];
  createRows();
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
    // <Box className='users-table-container_'>
    //   <Box className='users-table_'>
    //     <Typography variant='h1'> Users Table</Typography>
    //     {/* <div style={{ flexGrow: 1 }}> */}
    //     <DataGrid
    //       className='user-table-grid_'
    //       // sx={{ color: "primary" }}
    //       rows={rows}
    //       columns={columns}
    //       pageSize={5}
    //       rowsPerPageOptions={[5]}
    //       checkboxSelection
    //       onSelectionModelChange={handleSelectionModelChange}
    //     />
    //     {/* <ButtonGroup
    //       variant='contained'
    //       aria-label='outlined primary button group'
    //     >
    //       <Button startIcon={<ArrowBackIcon />} onClick={() => navigate("/")}>
    //         Cancel
    //       </Button>
    //       <Button
    //         type='submit'
    //         variant='contained'
    //         endIcon={<RegisterIcon />}
    //         color={"primary"}
    //         onClick={handleModify}
    //         disabled={btnDisabled}
    //       >
    //         Modify
    //       </Button>
    //       <Button
    //         startIcon={<ClearIcon />}
    //         onClick={handleDelete}
    //         disabled={btnDisabled}
    //       >
    //         Delete
    //       </Button>
    //     </ButtonGroup> */}
    //   </Box>
    // </Box>
  );
};

export default ContractsTable;
