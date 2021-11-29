import React, { useContext, useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";

// import AdminContext from "../../context/admin/adminContext";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/system";

const columns = [
  { field: "item", headerName: "Item", width: 290 },
  { field: "value", headerName: "Value", width: 160 },
];

const SummaryTable = (props) => {
  const navigate = useNavigate();
  //   const adminContext = useContext(AdminContext);
  //   const { users, deleteUser, setCurrentUser, clearCurrUser } = adminContext;

  const [reload, setReload] = useState(false);

  const [selectedRows, setSelectedRows] = useState();
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [modUserDialog, setModUserDialog] = useState(false);

  const [summData, setSummData] = useState([]);

  const {
    companyName,
    city,
    postalCode,
    addressLine,
    startDate,
    endDate,
    price,
    itn,
    erp,
    cityITN,
    postalCodeITN,
    addressLineITN,
    loadType,
  } = props.props;

  useEffect(() => {
    console.log(props);
  }, []);

  const createRows = () => {
    const res = [
      { item: "Company name", value: companyName, id: 1 },
      { item: "City of registration", value: city, id: 2 },
      { item: "Postal code of registration", value: postalCode, id: 3 },
      { item: "Address of registration", value: addressLine, id: 4 },
      { item: "Contract start date", value: startDate, id: 5 },
      { item: "Contract end date", value: endDate, id: 6 },
      { item: "Contract price per MWh in BGN", value: price, id: 7 },
      { item: "ITN", value: itn, id: 8 },
      { item: "Load type", value: loadType, id: 13 },
      { item: "ERP", value: erp, id: 9 },
      { item: "City of ITN", value: cityITN, id: 10 },
      { item: "Postal code of ITN", value: postalCodeITN, id: 11 },
      { item: "Address of ITN", value: addressLineITN, id: 12 },
    ];
    return res;
  };
  return (
    <>
      <Box className='summary-table-container'>
        <h1>SummaryTable</h1>
        <DataGrid
          className='summary-table'
          rows={createRows()}
          columns={columns}
          pageSize={13}
          rowsPerPageOptions={[13]}
          // checkboxSelection
          // onSelectionModelChange={handleSelectionModelChange}
        />
      </Box>
    </>
  );
};
export default SummaryTable;

//   const reloadAfterModify = () => {
//     setModUserDialog(false);
//   };

//   const createRows = () => {
//     const res = users.map((user) =>
//       Object.assign({}, user, {
//         is_active: user.is_active ? "yes" : "no",
//         is_superuser: user.is_superuser ? "yes" : "no",
//       })
//     );

//     return res;
//   };

//   const handleDelete = () => {
//     const selectedEmails = selectedRows.map((row) => row.email);

//     selectedEmails.map((x) => deleteUser(x));
//   };

//   const handleModify = () => {
//     // const selectedEmail = selectedRows.map((row) => row.email)[0];

//     setModUserDialog(true);
//   };

//   const handleSelectionModelChange = (ids) => {
//     const selectedIDs = new Set(ids);

//     const selectedRowData = rows.filter((row) => selectedIDs.has(row.id));
//     setSelectedRows(selectedRowData);
//     const selectedUser = users.filter(
//       (x) => x.id === [...selectedIDs].pop()
//     )[0];

//     if (selectedIDs.size !== 0) {
//       setCurrentUser(selectedUser);
//       setBtnDisabled(false);
//     } else {
//       clearCurrUser();
//       setBtnDisabled(true);
//     }
//   };

//   const rows = createRows();

//   if (modUserDialog) {
//     return <ModifyUser reloadCallback={reloadAfterModify} />;
//   } else {
//     console.log("returning from users table");
//     return (
//       <Box className='users-table-container'>
//         <Box className='users-table'>
//           <Typography variant='h1'> Users Table</Typography>
//           {/* <div style={{ flexGrow: 1 }}> */}
//           <DataGrid
//             rows={rows}
//             columns={columns}
//             pageSize={5}
//             rowsPerPageOptions={[5]}
//             checkboxSelection
//             onSelectionModelChange={handleSelectionModelChange}
//           />
//           <ButtonGroup
//             variant='contained'
//             aria-label='outlined primary button group'
//           >
//             <Button startIcon={<ArrowBackIcon />} onClick={() => navigate("/")}>
//               Cancel
//             </Button>
//             <Button
//               type='submit'
//               variant='contained'
//               endIcon={<RegisterIcon />}
//               color={"primary"}
//               onClick={handleModify}
//               disabled={btnDisabled}
//             >
//               Modify
//             </Button>
//             <Button
//               startIcon={<ClearIcon />}
//               onClick={handleDelete}
//               disabled={btnDisabled}
//             >
//               Delete
//             </Button>
//           </ButtonGroup>
//         </Box>
//       </Box>
//     );
//   }
// };
