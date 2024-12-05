import React, { useEffect, useState } from "react";
import { getOrdersInProgress } from "../../../store/endpoint/order/view";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

// Define columns (update totalPrice to use Rupiah format)
const columns = [
  { id: "_id", label: "Order ID", minWidth: 200 },
  { id: "tableNumber", label: "Table Number", minWidth: 100 },
  { id: "area", label: "Area", minWidth: 100 },
  { id: "items", label: "Items", minWidth: 300 },
  {
    id: "totalPrice",
    label: "Total Price",
    minWidth: 150,
    align: "center",
    format: (value) => value.toLocaleString("id-ID", { style: "currency", currency: "IDR" }), // Format to Rupiah
  },
  { id: "status", label: "Status", minWidth: 150, align: "center" },
];

export default function OrderList() {
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getOrdersInProgress(); // Fetch orders
        const formattedRows = data.map((order) => ({
          _id: order._id,
          tableNumber: order.table ? order.table.tableNumber : "N/A",
          area: order.table ? order.table.area : "N/A",
          items: order.items
            .map((item) =>
              item.product
                ? `${item.product.name} (${item.quantity})`
                : `Unknown Product (${item.quantity})`
            )
            .join(", "),
          totalPrice: order.items.reduce((acc, item) => acc + (item.price || 0), 0),
          status: order.status,
        }));
        setRows(formattedRows);
      } catch (error) {
        console.error(
          "Failed to fetch orders:",
          error.response ? error.response.data : error.message
        );
      }
    };

    fetchOrders();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align || "left"}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align || "left"}>
                        {column.format && typeof value === "number"
                          ? column.format(value)
                          : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
