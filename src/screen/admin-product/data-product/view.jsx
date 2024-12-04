import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import { dark, primary } from '../../../theme/color'

import { listProduct } from '../../../store/endpoint/product/list-product/view';
import { deleteProduct } from '../../../store/endpoint/product/delete-product/view';
import { updateProduct } from '../../../store/endpoint/product/update-product/view';

const columns = [
  { id: 'name', label: 'Name', minWidth: 250, align: 'center' },
  { id: 'price', label: 'Price', minWidth: 100, align: 'center' },
  { id: 'mainCategory', label: 'Category', minWidth: 170, align: 'center' },
  { id: 'subCategory', label: 'Subcategory', minWidth: 170, align: 'center' },
  { id: 'averageRating', label: 'Average Rating', minWidth: 170, align: 'center' },
  { id: 'action', label: 'Action', minWidth: 100, align: 'center' },
];

const mainCategories = ['Food', 'Drink', 'Dessert'];
const validSubcategories = {
  Food: ['Indonesian Food', 'Korean Food', 'Italian Food', 'Japanese Food', 'Chinese Food', 'American Food'],
  Drink: ['Cold', 'Hot'],
  Dessert: ['Cold', 'Hot'],
};

export default function ProductListData() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [subcategories, setSubcategories] = useState([]);

  // State untuk filter kategori dan subkategori
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await listProduct();
        setProducts(data);
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
    if (!ratings || ratings.length === 0) return 0;
    const total = ratings.reduce((sum, r) => sum + r.rating, 0);
    return (total / ratings.length).toFixed(2);
  };

  const handleDelete = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(productId);
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product._id !== productId)
        );
        alert('Product deleted successfully.');
      } catch (error) {
        console.error('Error deleting product:', error);
        alert(error.message);
      }
    }
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setSubcategories(validSubcategories[product.mainCategory] || []);
    setOpenEditModal(true);
  };

  const handleUpdate = async () => {
    if (
      !selectedProduct.name ||
      !selectedProduct.price ||
      !selectedProduct.mainCategory
    ) {
      alert('Please fill in all required fields.');
      return;
    }

    if (!mainCategories.includes(selectedProduct.mainCategory)) {
      alert('Invalid main category.');
      return;
    }

    if (
      selectedProduct.subCategory &&
      !validSubcategories[selectedProduct.mainCategory].includes(
        selectedProduct.subCategory
      )
    ) {
      alert('Invalid subcategory for the selected main category.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('name', selectedProduct.name);
      formData.append('price', selectedProduct.price);
      formData.append('category[main]', selectedProduct.mainCategory);
      formData.append('category[sub]', selectedProduct.subCategory || '');
      formData.append('description', selectedProduct.description);
      if (selectedProduct.imageFile) {
        formData.append('photo', selectedProduct.imageFile);
      }

      await updateProduct(selectedProduct._id, formData);
      alert('Product updated successfully.');
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product._id === selectedProduct._id
            ? { ...product, ...selectedProduct }
            : product
        )
      );
      setOpenEditModal(false);
    } catch (error) {
      console.error('Error updating product:', error);
      alert(error.message);
    }
  };

  const handleFileChange = (e) => {
    setSelectedProduct({ ...selectedProduct, imageFile: e.target.files[0] });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedProduct({ ...selectedProduct, [name]: value });

    if (name === 'mainCategory') {
      setSubcategories(validSubcategories[value] || []);
      setSelectedProduct((prev) => ({ ...prev, subCategory: '' }));
    }
  };

  const handleCloseModal = () => {
    setOpenEditModal(false);
    setSelectedProduct(null);
  };

  // Filter produk berdasarkan kategori dan subkategori
  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === '' || product.category.main === selectedCategory;
    const matchesSubcategory =
      selectedSubcategory === '' || product.category.sub === selectedSubcategory;
    return matchesCategory && matchesSubcategory;
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', marginTop: 2 }}>
      {/* Filter */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          marginBottom: 2,
          marginLeft: 2,
          maxWidth: 600,
          gap: 2,
        }}
      >
        <TextField
          select
          label="Main Category"
          value={selectedCategory}
          onChange={(e) => {
            setSelectedCategory(e.target.value);
            setSelectedSubcategory(''); // Reset subcategory ketika kategori utama berubah
          }}
          fullWidth
          margin="dense"
          variant="standard"
        >
          <MenuItem value="">All Categories</MenuItem>
          {mainCategories.map((category) => (
            <MenuItem key={category} value={category}>
              {category}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          label="Subcategory"
          value={selectedSubcategory}
          onChange={(e) => setSelectedSubcategory(e.target.value)}
          fullWidth
          margin="dense"
          variant="standard"
          disabled={!selectedCategory}
        >
          <MenuItem value="">All Subcategories</MenuItem>
          {validSubcategories[selectedCategory]?.map((subcategory) => (
            <MenuItem key={subcategory} value={subcategory}>
              {subcategory}
            </MenuItem>
          ))}
        </TextField>
      </Box>



      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align="center"
                  sx={{
                    fontWeight: 'bold', // Membuat teks bold
                    borderBottom: '2px solid', // Garis bawah tebal
                    borderBottomColor: dark[300],
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredProducts
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                  <TableCell align="center">{row.name}</TableCell>
                  <TableCell align="center">{row.price}</TableCell>
                  <TableCell align="center">{row.category.main}</TableCell>
                  <TableCell align="center">{row.category.sub}</TableCell>
                  <TableCell align="center">
                    {calculateAverageRating(row.ratings)}
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      variant="outlined"
                      sx={{
                        color:  primary[100], // Warna teks dan ikon
                        borderColor:  primary[100], // Warna border tombol
                        '&:hover': {
                          borderColor:  primary[100] , // Warna border saat hover
                          backgroundColor: 'rgba(255, 255, 0, 0.1)', // Background warna kuning transparan saat hover
                        },
                      }}
                      size="small"
                      onClick={() => handleEdit(row)}
                    >
                      <EditIcon sx={{ color: primary[100] }} /> {/* Mengubah warna ikon Edit */}
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      size="small"
                      onClick={() => handleDelete(row._id)}
                      sx={{ ml: 1 }} // Memberikan margin kiri untuk jarak
                    >
                      <DeleteIcon />
                    </Button>
                  </TableCell>

                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={filteredProducts.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      {/* Modal Edit Produk */}
      {/* Edit Modal */}
      {selectedProduct && (
        <Modal
          open={openEditModal}
          onClose={handleCloseModal}
          closeAfterTransition
          BackdropComponent={Backdrop}
        >
          <Paper
            sx={{
              width: 600,
              padding: 3,
              margin: 'auto',
              top: '10%',
              position: 'relative',
            }}
          >
            <Box display="flex" gap={2}>
              <Box flex={1}>
                <img
                  src={selectedProduct.photo || 'fallback-image-url.jpg'}
                  alt={selectedProduct.name || 'Product Image'}
                  style={{ width: '100%', borderRadius: 8, marginBottom: 10 }}
                />
                <input type="file" onChange={handleFileChange} />
              </Box>
              <Box flex={1}>
                <TextField
                  fullWidth
                  margin="dense"
                  label="Name"
                  name="name"
                  value={selectedProduct.name || ''}
                  onChange={handleInputChange}
                />
                <TextField
                  fullWidth
                  margin="dense"
                  label="Price"
                  name="price"
                  type="number"
                  value={selectedProduct.price || ''}
                  onChange={handleInputChange}
                />
                <FormControl fullWidth margin="dense">
                  <InputLabel>Main Category</InputLabel>
                  <Select
                    name="mainCategory"
                    value={selectedProduct.mainCategory || ''}
                    onChange={handleInputChange}
                  >
                    {mainCategories.map((category) => (
                      <MenuItem key={category} value={category}>
                        {category}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl fullWidth margin="dense" disabled={!subcategories.length}>
                  <InputLabel>Subcategory</InputLabel>
                  <Select
                    name="subCategory"
                    value={selectedProduct.subCategory || ''}
                    onChange={handleInputChange}
                  >
                    {subcategories.map((subcategory) => (
                      <MenuItem key={subcategory} value={subcategory}>
                        {subcategory}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <TextField
                  fullWidth
                  margin="dense"
                  label="Description"
                  name="description"
                  multiline
                  rows={3}
                  value={selectedProduct.description || ''}
                  onChange={handleInputChange}
                />
              </Box>
            </Box>
            <Box display="flex" justifyContent="space-between" mt={2}>
              <Button color="error" onClick={handleCloseModal}>
                Cancel
              </Button>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: primary[100],
                  '&:hover': {
                    backgroundColor: primary[200],
                  },
                }}
                onClick={handleUpdate}
              >
                Save Changes
              </Button>

            </Box>
          </Paper>
        </Modal>
      )}
    </Paper>
  );
}
