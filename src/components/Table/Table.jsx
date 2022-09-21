import React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";

//column example
const columns = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "coordinatorName",
    headerName: "Coordinator Name",
    width: 200,
  },
  {
    field: "contact",
    headerName: "Contact",
    type: "number",
    width: 200,
  },
  {
    field: "email",
    headerName: "Email",
    width: 200,
  },
  {
    field: "address",
    headerName: "Address",
    width: 200,
    // description: "This column has a value getter and is not sortable.",
    // sortable: false,
    // width: 160,
    // valueGetter: (params) =>
    //   `${params.row.contact || ""} ${params.row coordinatorName || ""}`,
  },
  {
    field: "action",
    headerName: "Action",
    width: 200,
    renderCell: (params) => {
      const Delete = (e) => {
        e.stopPropagation(); // don't select this row after clicking

        const api = params.api;
        const thisRow = {};

        api
          .getAllColumns()
          .filter((c) => c.field !== "__check__" && !!c)
          .forEach(
            (c) => (thisRow[c.field] = params.getValue(params.id, c.field))
          );

        return alert(JSON.stringify(thisRow, null, 4));
      };

      const Update = (e) => {
        e.stopPropagation(); // don't select this row after clickin
        return alert("update");
      };

      return (
        <div className="space-x-4">
          <button
            className="cursor-pointer bg-slate-600 hover:bg-slate-800 transition-all text-white py-2 px-4 rounded-lg border-2"
            onClick={Update}
          >
            Edit
          </button>
          <button
            className="cursor-pointer cursor-pointer bg-slate-900 hover:bg-slate-600 transition-all text-white py-2 px-4 rounded-lg border-2"
            onClick={Delete}
          >
            Delete
          </button>
        </div>
      );
    },
  },
];

export default function Table({ data }) {
  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={data}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        // checkboxSelection
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}
      />
    </Box>
  );
}
