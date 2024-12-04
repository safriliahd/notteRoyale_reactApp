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

import { listProduct } from '../../../store/endpoint/product/list-product/view';
import { deleteProduct } from '../../../store/endpoint/product/delete-product/view';
import { updateProduct } from '../../../store/endpoint/product/update-product/view';

const columns = [
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'price', label: 'Price', minWidth: 100, align: 'right' },
  { id: 'mainCategory', label: 'Category', minWidth: 170 },
  { id: 'subCategory', label: 'Subcategory', minWidth: 170 },
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

    // if (!selectedProduct.name || !selectedProduct.price || !selectedProduct.mainCategory || !selectedProduct.subCategory) {
    //   alert('Please fill in all fields.');
    //   return;
    // }
    
    try {
      const formData = new FormData();
      formData.append('name', selectedProduct.name);
      formData.append('price', selectedProduct.price);
      formData.append('category[main]', selectedProduct.mainCategory);
      formData.append('category[sub]', selectedProduct.subCategory);
      formData.append('description', selectedProduct.description);
      if (selectedProduct.imageFile) {
        formData.append('image', selectedProduct.imageFile);
      }

      await updateProduct(selectedProduct._id, formData);
      alert('Product updated successfully.');
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
      setSelectedProduct({ ...selectedProduct, subCategory: '' });
    }
  };

  const handleCloseModal = () => {
    setOpenEditModal(false);
    setSelectedProduct(null);
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
                <TableCell key={column.id} align={column.align || 'center'}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {products.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
              <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                {columns.map((column) => {
                  let value = row[column.id];

                  if (column.id === 'mainCategory') {
                    value = row.category.main;
                  } else if (column.id === 'subCategory') {
                    value = row.category.sub;
                  } else if (column.id === 'averageRating') {
                    value = calculateAverageRating(row.ratings);
                  } else if (column.id === 'action') {
                    value = (
                      <>
                        <DeleteIcon
                          sx={{ cursor: 'pointer', color: 'red', marginRight: 1 }}
                          onClick={() => handleDelete(row._id)}
                        />
                        <EditIcon
                          sx={{ cursor: 'pointer', color: 'blue' }}
                          onClick={() => handleEdit(row)}
                        />
                      </>
                    );
                  }

                  return <TableCell key={column.id}>{value}</TableCell>;
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

      {/* Edit Modal */}
      {selectedProduct && (
        <Modal open={openEditModal} onClose={handleCloseModal} closeAfterTransition BackdropComponent={Backdrop}>
          <Paper sx={{ width: 600, padding: 3, margin: 'auto', top: '10%', position: 'relative' }}>
            <Box display="flex" gap={2}>
              <Box flex={1}>
                <img
                  src={selectedProduct.photo || 'fallback-image-url.jpg'}
                  alt={selectedProduct.name || 'Product Image'}
                  style={{ width: '100%', borderRadius: 8, marginBottom: '1rem' }}
                />
                <TextField
                  label="Description"
                  multiline
                  rows={4}
                  fullWidth
                  name="description"
                  value={selectedProduct.description}
                  onChange={handleInputChange}
                />
                <Button variant="contained" component="label" sx={{ marginTop: 2 }}>
                  Upload Image
                  <input type="file" hidden accept="image/*" onChange={handleFileChange} />
                </Button>
              </Box>
              <Box flex={1} display="flex" flexDirection="column" gap={2}>
                <TextField
                  label="Name"
                  fullWidth
                  name="name"
                  value={selectedProduct.name}
                  onChange={handleInputChange}
                />
                <TextField
                  label="Price"
                  fullWidth
                  name="price"
                  value={selectedProduct.price}
                  onChange={handleInputChange}
                />
                <FormControl fullWidth>
                  <InputLabel>Main Category</InputLabel>
                  <Select
                    name="mainCategory"
                    value={selectedProduct.mainCategory}
                    onChange={handleInputChange}
                  >
                    {mainCategories.map((category) => (
                      <MenuItem key={category} value={category}>
                        {category}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl fullWidth>
                  <InputLabel>Subcategory</InputLabel>
                  <Select
                    name="subCategory"
                    value={selectedProduct.subCategory}
                    onChange={handleInputChange}
                    disabled={!subcategories.length}
                  >
                    {subcategories.map((subcategory) => (
                      <MenuItem key={subcategory} value={subcategory}>
                        {subcategory}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </Box>
            <Box mt={2} display="flex" justifyContent="flex-end" gap={2}>
              <Button variant="outlined" onClick={handleCloseModal}>
                Cancel
              </Button>
              <Button variant="contained" onClick={handleUpdate}>
                Save
              </Button>
            </Box>
          </Paper>
        </Modal>
      )}
    </Paper>
  );
}
