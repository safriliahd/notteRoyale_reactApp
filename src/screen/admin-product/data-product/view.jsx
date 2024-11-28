import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { listProduct } from '../../../store/endpoint/product/list-product/view'; // Import fungsi listProduct dari API

const columns = [
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'price', label: 'Price', minWidth: 100, align: 'right' },
  { id: 'categoryMain', label: 'Category', minWidth: 170 },
  { id: 'categorySub', label: 'Subcategory', minWidth: 170 },
  { id: 'averageRating', label: 'Average Rating', minWidth: 170, align: 'center' },
];

export default function ProductListData() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await listProduct(); // Memanggil API untuk mendapatkan produk
        setProducts(data); // Menyimpan data produk ke state
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const calculateAverageRating = (ratings) => {
    if (ratings.length === 0) return 0;
    const total = ratings.reduce((sum, r) => sum + r.rating, 0);
    return (total / ratings.length).toFixed(2); // Menghitung rata-rata rating
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', marginTop: 2 }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
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
                    textAlign: 'center',
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {products
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                  {columns.map((column) => {
                    let value = row[column.id];

                    // Memastikan value untuk 'categoryMain' dan 'categorySub'
                    if (column.id === 'categoryMain') {
                      value = row.category.main;
                    } else if (column.id === 'categorySub') {
                      value = row.category.sub;
                    }

                    // Jika 'averageRating', hitung rata-rata rating
                    if (column.id === 'averageRating') {
                      value = calculateAverageRating(row.ratings);
                    }

                    return (
                      <TableCell
                        key={column.id}
                        align={column.align || 'center'}
                        sx={{
                          borderLeft: 'none',
                          textAlign: column.align || 'center',
                        }}
                      >
                        {value}
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
        count={products.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
