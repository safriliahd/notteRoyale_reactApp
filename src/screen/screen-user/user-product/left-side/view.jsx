import React from 'react';
import { Box, Card, CardMedia, Grid, Paper } from "@mui/material";
import { useParams } from "react-router-dom"; // Import useParams
import { dark, light } from "../../../../theme/color";
import ImageNotte from "../../../../../public/background.jpg";

// Sample data array for products
const menuData = [
  { id: 1, name: "Menu 1", price: "Rp 50,000", rating: "4.5", image: ImageNotte },
  { id: 2, name: "Menu 2", price: "Rp 75,000", rating: "4.2", image: ImageNotte },
  { id: 3, name: "Menu 3", price: "Rp 100,000", rating: "4.8", image: ImageNotte },
  { id: 4, name: "Menu 4", price: "Rp 60,000", rating: "4.3", image: ImageNotte },
  { id: 5, name: "Menu 5", price: "Rp 40,000", rating: "4.1", image: ImageNotte },
  { id: 6, name: "Menu 6", price: "Rp 30,000", rating: "4.7", image: ImageNotte },
];

export default function LeftSideProductDetail() {
  const { id } = useParams(); // Get the product id from the URL
  const product = menuData.find(item => item.id === Number(id)); // Find the product by id

  // If no product found, return an error message
  if (!product) {
    return <h1>Product not found</h1>;
  }

  return (
    <Box sx={{ marginTop: 5, padding: 0 }}>
      <Grid container spacing={3} columns={{ xs: 4, sm: 8, md: 12 }} sx={{ paddingLeft: 0 }}>
        <Grid item xs={4} sm={8} md={6} sx={{ mb: { xs: 5, sm: 0 } }}>
          <Paper
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "stretch",
              paddingTop: 0,
              boxShadow: "none",
            }}
          >
            <Box sx={{ paddingInlineStart: 2, paddingInlineEnd: 2 }}>
              <h1>{product.name}</h1> {/* Display product name */}
              <Card sx={{ flex: 1, width: "100%" }}>
                <CardMedia
                  component="img"
                  image={product.image} // Display product image
                  alt={product.name}
                  sx={{ height: 400 }}
                />
              </Card>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={4} sm={8} md={6} sx={{ mb: { xs: 2, sm: 0 } }}>
          <Paper
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              paddingTop: 0,
              boxShadow: "none",
            }}
          >
            <Box sx={{ paddingInlineStart: 2, paddingInlineEnd: 2 }}>
              <h1>{product.name}</h1> {/* Display product name */}
              <h3>Price: {product.price}</h3> {/* Display product price */}
              <h3>Rating: {product.rating}</h3> {/* Display product rating */}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
