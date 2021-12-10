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

// const columns = [
//   { field: "id", headerName: "ID", width: 70 },
//   { field: "email", headerName: "Email", width: 160 },
//   // { field: "full_name", headerName: "Full name", width: 150 },
//   // { field: "is_active", headerName: "Is active", width: 130 },
//   // { field: "is_superuser", headerName: "Is Admin", width: 130 },
//   // { field: "creator_email", headerName: "Creator email", width: 130 },
//   // { field: "last_seen", headerName: "Last seen", width: 130 },
//   // { field: "last_updated", headerName: "Last updated", width: 130 },
// ];

const ContractsTable = () => {
  // const authContext = useContext(AuthContext);
  const userContext = useContext(UserContext);
  // const { isAuthenticated, verifyToken, isGuest } = authContext;
  const {
    contracts,
    loading,
    startLoader,
    getContracts,
    setSelectedContract,
    clearSelectedContract,
    selectedContract,
    deleteContract,
  } = userContext;
  const navigate = useNavigate();

  // const [reload, setReload] = useState(false);

  const [selectedRows, setSelectedRows] = useState();
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [modUserDialog, setModUserDialog] = useState(false);

  useEffect(() => {
    getContracts();
  }, []);

  // const reloadAfterModify = () => {
  //   setModUserDialog(false);
  // };

  const createRows = () => {
    const rows = contracts.map((x) =>
      Object.assign(
        {},
        {
          id: x.id,
          contractor: x.contractor.name,
          contractorEik: x.contractor.eik,
          startDate: x.start_date,
          endDate: x.end_date,
          itn: x.sub_contracts[0].itn,
          price: x.sub_contracts[0].price,
        }
      )
    );
    return rows;
  };

  const handleDelete = () => {
    console.log("in handleDelete");
    selectedRows.map((row) => deleteContract(row.id));
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

    if (selectedIDs.size !== 0) {
      setSelectedContract(selectedContract);
      setBtnDisabled(false);
    } else {
      clearSelectedContract();
      setBtnDisabled(true);
    }
  };
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "contractor", headerName: "Contractor name", width: 230 },
    { field: "contractorEik", headerName: "Eik", width: 130 },
    { field: "startDate", headerName: "Start date", width: 130 },
    { field: "endDate", headerName: "End date", width: 130 },
    { field: "itn", headerName: "Itn", width: 300 },
    { field: "price", headerName: "Price", width: 80 },
  ];

  const rows = createRows();
  return (
    <div style={{ height: 400, width: "100%" }}>
      <Typography variant='h1'> Contracts Table</Typography>
      <DataGrid
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
      </ButtonGroup>{" "}
    </div>
  );
};

export default ContractsTable;
