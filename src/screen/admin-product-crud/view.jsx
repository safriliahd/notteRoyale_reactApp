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
import { useDropzone } from 'react-dropzone';
import { addProduct } from '../../store/endpoint/product/add-product/view';
import { useNavigate } from 'react-router-dom';
import { primary } from '../../theme/color';

const CreateProduct = () => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    mainCategory: '',
    subCategory: '',
    description: '',
    photo: null,
    photoPreview: null,
  });

  const [mainCategory, setMainCategory] = useState('');
  const [subcategories, setSubcategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const mainCategories = ['Food', 'Drink', 'Dessert'];
  const validSubcategories = {
    Food: ['Indonesian Food', 'Korean Food', 'Italian Food', 'Japanese Food', 'Chinese Food', 'American Food'],
    Drink: ['Cold', 'Hot'],
    Dessert: ['Cold', 'Hot'],
  };

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'mainCategory') {
      setMainCategory(value);
      setSubcategories(validSubcategories[value] || []);
      setFormData({ ...formData, subCategory: '' });
    }
  };

  const handleDrop = (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setFormData({
        ...formData,
        photo: file,
        photoPreview: URL.createObjectURL(file),
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const productData = new FormData();
    productData.append('name', formData.name);
    productData.append('price', formData.price);
    productData.append('category[main]', mainCategory);
    productData.append('category[sub]', formData.subCategory);
    productData.append('description', formData.description);
    if (formData.photo) {
      productData.append('image', formData.photo);
    }
    try {
      await addProduct(productData);
      alert('Product created successfully!');
      navigate(-1);
      setFormData({
        name: '',
        price: '',
        mainCategory: '',
        subCategory: '',
        description: '',
        photo: null,
        photoPreview: null,
      });
      setMainCategory('');
      setSubcategories([]);
    } catch (error) {
      alert(error.message || 'Failed to create product.');
    } finally {
      setLoading(false);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleDrop,
    accept: 'image/*',
    multiple: false,
  });

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" align="center" gutterBottom sx={{fontWeight: 'bold'}}>
        Create New Product
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Box
              {...getRootProps()}
              sx={{
                border: '4px dashed #EBC834',
                borderRadius: 2,
                height: 300,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                cursor: 'pointer',
                bgcolor: isDragActive ? 'rgba(255, 215, 0, 0.2)' : 'background.paper',
              }}
            >
              <input {...getInputProps()} />
              {formData.photoPreview ? (
                <img
                  src={formData.photoPreview}
                  alt="Preview"
                  style={{
                    maxHeight: '100%',
                    maxWidth: '100%',
                    objectFit: 'cover',
                  }}
                />
              ) : (
                <Typography>
                  {isDragActive
                    ? 'Drop the image here...'
                    : 'Drag & drop an image here or click to select'}
                </Typography>
              )}
            </Box>
            {formData.photo && (
              <Typography align="center" sx={{ mt: 1 }}>
                {formData.photo.name}
              </Typography>
            )}
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Product Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              type="number"
              label="Price"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              required
              inputProps={{ min: 0, step: 0.01 }}
              sx={{ mb: 2 }}
            />
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Main Category</InputLabel>
              <Select
                name="mainCategory"
                value={mainCategory}
                onChange={handleInputChange}
                required
              >
                {mainCategories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {subcategories.length > 0 && (
              <FormControl fullWidth sx={{ mb: 2 }}>
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
            )}
            <TextField
              fullWidth
              multiline
              rows={3}
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              fullWidth
              type="submit"
              variant="contained"
              sx={{
                mt: 3,
                bgcolor: primary[100],
                '&:hover': {
                  bgcolor: primary[200],
                },
              }}
              disabled={loading}
            >
              {loading ? 'Creating...' : 'Add Product'}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default CreateProduct;
