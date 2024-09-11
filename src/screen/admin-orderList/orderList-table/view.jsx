import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import SelectAllIcon from '@mui/icons-material/SelectAll';
import CancelIcon from '@mui/icons-material/Cancel';

// Definisikan kolom tabel
const columns = [
  { id: 'id', label: 'Id', minWidth: 100 },
  { id: 'category', label: 'Category', minWidth: 150 },
  { id: 'name', label: 'Name', minWidth: 170 },
  {
    id: 'totalPrice',
    label: 'Total Price',
    minWidth: 170,
    align: 'center', // Rata tengah
    format: (value) => value.toLocaleString('en-US', { style: 'currency', currency: 'USD' }),
  },
  {
    id: 'quantity',
    label: 'Quantity',
    minWidth: 150,
    align: 'center', // Rata tengah
  },
  {
    id: 'done',
    label: 'Done',
    minWidth: 100,
    align: 'center',
  },
];

// Data dummy
const rows = [
  { id: 1, category: 'Electronics', name: 'Laptop', totalPrice: 999.99, quantity: 5, done: true },
  { id: 2, category: 'Furniture', name: 'Chair', totalPrice: 49.99, quantity: 10, done: false },
  { id: 3, category: 'Books', name: 'React Guide', totalPrice: 29.99, quantity: 15, done: true },
  { id: 4, category: 'Clothing', name: 'Jacket', totalPrice: 79.99, quantity: 7, done: false },
  { id: 5, category: 'Kitchen', name: 'Blender', totalPrice: 89.99, quantity: 4, done: true },
  { id: 1, category: 'Electronics', name: 'Laptop', totalPrice: 999.99, quantity: 5, done: true },
  { id: 2, category: 'Furniture', name: 'Chair', totalPrice: 49.99, quantity: 10, done: false },
  { id: 3, category: 'Books', name: 'React Guide', totalPrice: 29.99, quantity: 15, done: true },
  { id: 4, category: 'Clothing', name: 'Jacket', totalPrice: 79.99, quantity: 7, done: false },
  { id: 5, category: 'Kitchen', name: 'Blender', totalPrice: 89.99, quantity: 4, done: true },

];

export default function OrderListData() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [selected, setSelected] = React.useState([]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleSelectAllClick = () => {
    if (selected.length === rows.length) {
      setSelected([]); // Deselect all if all are selected
    } else {
      setSelected(rows.map((row) => row.id)); // Select all
    }
  };

  const handleClick = (id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <IconButton
                  aria-label="select all"
                  onClick={handleSelectAllClick}
                >
                  {selected.length === rows.length ? <CancelIcon /> : <SelectAllIcon />}
                </IconButton>
              </TableCell>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align || 'center'}
                  sx={{
                    minWidth: column.minWidth,
                    borderLeft: 'none',
                    borderBottom: '2px solid black',
                    fontWeight: 'bold',
                    fontSize: '1.2rem',
                    textAlign: column.align || 'center', // Rata tengah untuk judul kolom
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                const isItemSelected = isSelected(row.id);
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isItemSelected}
                        onChange={() => handleClick(row.id)}
                      />
                    </TableCell>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell
                          key={column.id}
                          align={column.align || 'center'}
                          sx={{
                            borderLeft: 'none',
                            textAlign: column.align || 'center', // Rata tengah untuk data kolom
                          }}
                        >
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
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
