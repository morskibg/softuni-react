import React, { useContext, useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { DataGrid } from "@mui/x-data-grid";

import AuthContext from "../../../../context/auth/authContext";
import UserContext from "../../../../context/user/userContext";

import { useNavigate } from "react-router-dom";

import "../css/CreateContract.css";
import { Typography } from "@mui/material";
import RegisterIcon from "@mui/icons-material/Storage";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ClearIcon from "@mui/icons-material/LayersClear";
import { Button, ButtonGroup } from "@mui/material";

const ContractsTable = () => {
  const authContext = useContext(AuthContext);
  const userContext = useContext(UserContext);
  const { isAuthenticated, verifyToken } = authContext;
  const {
    contracts,
    getContracts,
    setSelectedContract,
    clearSelectedContract,
    deleteContract,
    updateContract,
    // modClean,
  } = userContext;
  const navigate = useNavigate();

  const [selectedRows, setSelectedRows] = useState();
  const [btnDisabled, setBtnDisabled] = useState(true);

  const { handleSubmit } = useFormContext();

  const [selectionModel, setSelectionModel] = useState([]);

  // useEffect(() => {
  //   if (!isAuthenticated) {
  //     navigate("/");
  //   } else {
  //     verifyToken();
  //   }
  //   return clearSelectedContract;
  //   // eslint-disable-next-line
  // }, [isAuthenticated]);

  useEffect(() => {
    getContracts();
    return clearSelectedContract;
    // eslint-disable-next-line
  }, []);

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
    selectedRows.map((row) => deleteContract(row.id));
  };

  const handleModify = (data) => {
    // console.log("in handleModify");

    // console.log(
    //   "🚀 ~ file: ContractsTable.js ~ line 85 ~ handleModify ~ data",
    //   data
    // );
    updateContract(data);
    setSelectionModel([]);
    setBtnDisabled(true);
  };

  const handleCancel = () => {
    // modClean(true);
    navigate("/");
  };

  const handleSelectionModelChange = (ids) => {
    const selectedIDs = new Set(ids);
    setSelectionModel(selectedIDs.values().next().value);

    const selectedRowData = rows.filter((row) => selectedIDs.has(row.id));
    setSelectedRows(selectedRowData);
    const selectedContract = contracts.filter(
      (x) => x.id === [...selectedIDs].pop()
    )[0];

    if (selectedIDs.size !== 0) {
      setSelectedContract(selectedContract);
      setBtnDisabled(false);
    } else {
      setSelectionModel([]);
      clearSelectedContract();
      setBtnDisabled(true);
    }
  };

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "contractor", headerName: "Company name", width: 230 },
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
        // checkboxSelection
        onSelectionModelChange={handleSelectionModelChange}
        selectionModel={selectionModel}
      />
      <ButtonGroup
        variant='contained'
        aria-label='outlined primary button group'
      >
        <Button startIcon={<ArrowBackIcon />} onClick={handleCancel}>
          Cancel
        </Button>
        <Button
          type='submit'
          variant='contained'
          endIcon={<RegisterIcon />}
          color={"primary"}
          onClick={handleSubmit(handleModify)}
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
