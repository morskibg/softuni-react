import React, { useContext, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";

import AdminContext from "../../context/admin/adminContext";
import { Box } from "@mui/system";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "email", headerName: "Email", width: 160 },
  { field: "full_name", headerName: "Full name", width: 150 },
  { field: "is_active", headerName: "Is active", width: 130 },
  { field: "is_superuser", headerName: "Is Admin", width: 130 },
  { field: "creator_email", headerName: "Creator email", width: 130 },
  { field: "last_seen", headerName: "Last seen", width: 130 },
  { field: "last_updated", headerName: "Last updated", width: 130 },
  //   {
  //     field: "userType",
  //     headerName: "User type",
  //     type: "checkbox",
  //     width: 90,
  //   },
  //   {
  //     field: "fullName",
  //     headerName: "Full name",
  //     description: "This column has a value getter and is not sortable.",
  //     sortable: false,
  //     width: 160,
  //     valueGetter: (params) =>
  //       `${params.getValue(params.id, "firstName") || ""} ${
  //         params.getValue(params.id, "lastName") || ""
  //       }`,
  //   },
];

// const rows = [
//   { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
//   { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
//   { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
//   { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
//   { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
//   { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
//   { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
//   { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
//   { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
// ];

const UsersTable = () => {
  const adminContext = useContext(AdminContext);
  const { users, getUsers } = adminContext;

  useEffect(() => {
    if (!users) {
      getUsers();
    }
    // createRows();

    // eslint-disable-next-line
  }, [users]);
  const createRows = () => {
    const res = users.map((user) =>
      Object.assign({}, user, {
        is_active: user.is_active ? "yes" : "no",
        is_superuser: user.is_superuser ? "yes" : "no",
      })
    );
    console.log("🚀 ~ file: Table.js ~ line 68 ~ createRows ~ res", res);
    return res;
  };
  return (
    <Box>
      <DataGrid
        rows={createRows()}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </Box>
  );
};

export default UsersTable;

// export default function DataTable() {
//   return (
//     <div style={{ height: 400, width: "100%" }}>
//       <DataGrid
//         rows={rows}
//         columns={columns}
//         pageSize={5}
//         rowsPerPageOptions={[5]}
//         checkboxSelection
//       />
//     </div>
//   );
// }
