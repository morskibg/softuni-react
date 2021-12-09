import React from "react";
import { DataGrid } from "@mui/x-data-grid";

// import AdminContext from "../../context/admin/adminContext";
// import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { Box } from "@mui/system";

const columns = [
  { field: "item", headerName: "Item", width: 250 },
  { field: "value", headerName: "Value", width: 300 },
];

const SummaryTable = (props) => {
  //   const adminContext = useContext(AdminContext);
  //   const { users, deleteUser, setCurrentUser, clearCurrUser } = adminContext;

  const {
    name,
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
    eik,
  } = props.props;

  const createRows = () => {
    const res = [
      { item: "Company name", value: name, id: 1 },
      { item: "Company EIK", value: eik, id: 14 },
      { item: "City of registration", value: city, id: 2 },
      { item: "Postal code of registration", value: postalCode, id: 3 },
      { item: "Address of registration", value: addressLine, id: 4 },
      {
        item: "Contract start date",
        value: `${format(new Date(startDate), "dd/MM/yyyy")}`,
        id: 5,
      },
      {
        item: "Contract end date",
        value: `${format(new Date(endDate), "dd/MM/yyyy")}`,
        id: 6,
      },
      { item: "Contract price per kWh in BGN", value: price, id: 7 },
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
        />
      </Box>
    </>
  );
};
export default SummaryTable;
