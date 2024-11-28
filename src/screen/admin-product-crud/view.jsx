import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  Grid,
  MenuItem,
  TextField,
  Typography,
  InputLabel,
  FormControl,
  Select,
} from '@mui/material';
import { addProduct } from '../../store/endpoint/product/add-product/view';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const CreateProduct = () => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    mainCategory: '',
    subCategory: '',
    description: '',
    photo: null,
  });

  const [mainCategory, setMainCategory] = useState(''); // State untuk mainCategory
  const [subcategories, setSubcategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const mainCategories = ['Food', 'Drink', 'Dessert'];
  const validSubcategories = {
    Food: ['Indonesian Food', 'Korean Food', 'Italian Food', 'Japanese Food', 'Chinese Food', 'American Food'],
    Drink: ['Cold', 'Hot'],
    Dessert: ['Cold', 'Hot'],
  };

  const navigate = useNavigate(); // Hook navigate

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Update subcategories dynamically
    if (name === 'mainCategory') {
      setMainCategory(value); // Simpan kategori utama ke state
      setSubcategories(validSubcategories[value] || []);
      setFormData({ ...formData, subCategory: '' });
    }
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, photo: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const productData = new FormData();
    productData.append('name', formData.name);
    productData.append('price', formData.price);
    productData.append('category[main]', mainCategory); // Menggunakan state mainCategory
    productData.append('category[sub]', formData.subCategory);
    productData.append('description', formData.description);
    if (formData.photo) {
      productData.append('image', formData.photo);
    }
    console.log('Submitting Product Data:', Object.fromEntries(productData.entries()));
    try {
      await addProduct(productData);
      alert('Product created successfully!');
      navigate(-1); // Kembali ke halaman sebelumnya setelah sukses
      setFormData({
        name: '',
        price: '',
        mainCategory: '',
        subCategory: '',
        description: '',
        photo: null,
      });
      setMainCategory(''); // Reset mainCategory
      setSubcategories([]);
    } catch (error) {
      alert(error.message || 'Failed to create product.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Create New Product
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Product Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              type="number"
              label="Price"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              required
              inputProps={{ min: 0, step: 0.01 }}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Main Category</InputLabel>
              <Select
                name="mainCategory"
                value={mainCategory} // Gunakan state mainCategory
                onChange={handleInputChange}
                required
              >
                {mainCategories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          {subcategories.length > 0 && (
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Subcategory</InputLabel>
                <Select
                  name="subCategory"
                  value={formData.subCategory}
                  onChange={handleInputChange}
                  required
                >
                  {subcategories.map((subcategory) => (
                    <MenuItem key={subcategory} value={subcategory}>
                      {subcategory}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          )}
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" component="label">
              Upload Photo
              <input type="file" hidden accept="image/*" onChange={handleFileChange} />
            </Button>
            {formData.photo && <Typography>{formData.photo.name}</Typography>}
          </Grid>
          <Grid item xs={12}>
            <Button
              fullWidth
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
            >
              {loading ? 'Creating...' : 'Create Product'}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default CreateProduct;
