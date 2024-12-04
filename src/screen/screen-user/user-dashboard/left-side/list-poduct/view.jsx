import React, { useEffect, useState } from "react";
import { Box, Card, CardMedia, CardContent, Grid, Paper, Typography, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom"; 
import { getProductsByCategory } from "../../../../../store/endpoint/endpoint-user/product/view"; 

export default function ListProductDashboard({ category, subCategory }) {
  const [products, setProducts] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  
  const handleCardClick = (id) => {
    navigate(`/product/${id}`); // 
  };

  // Mengambil data produk berdasarkan kategori dan subkategori
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true); 
      try {
        console.log("Fetching products with:", { category, subCategory });
        const data = await getProductsByCategory(category, subCategory);
        console.log("Fetched data:", data);
        setProducts(data); 
        setLoading(false); 
      } catch (error) {
        console.error("Error fetching products:", error.message);
        setLoading(false); 
      }
    };

    fetchProducts(); 
  }, [category, subCategory]);

  return (
    <Box sx={{ marginTop: 5, padding: 0, marginLeft: 5, marginRight: 5 }}>
      {loading ? (
        <Box sx={{ textAlign: "center", marginTop: 5 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Box sx={{ textAlign: "center", marginTop: 5, color: "red" }}>
          <Typography variant="h6">{error}</Typography>
        </Box>
      ) : products.length === 0 ? (
        <Box sx={{ textAlign: "center", marginTop: 5 }}>
          <Typography variant="h6">Produk tidak ditemukan.</Typography>
        </Box>
      ) : (
        <Grid
          container
          spacing={3}
          columns={{ xs: 4, sm: 8, md: 12 }}
          sx={{ paddingLeft: 0, borderRadius: 10, marginBottom: 5 }}
        >
          {products.map((product) => (
            <Grid
              key={product._id}
              item
              xs={4}
              sm={8}
              md={4}
              sx={{ mb: { xs: 5, sm: 0 } }}
            >
              <Paper
                elevation={0}
                sx={{
                  backgroundColor: "transparent",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "stretch",
                  cursor: "pointer",
                }}
                onClick={() => handleCardClick(product._id)}
              >
                <Card sx={{ flex: 1, borderRadius: 5, maxWidth: 250 }}>
                  <CardMedia
                    component="img"
                    image={product.photo || "/placeholder.jpg"}
                    alt={product.name}
                    sx={{ height: 250 }}
                  />
                  <CardContent sx={{ textAlign: "center", paddingBottom: 0 }}>
                    <Typography
                      gutterBottom
                      component="div"
                      sx={{
                        fontSize: 16,
                        fontWeight: "bold",
                      }}
                    >
                      {product.name}
                    </Typography>
                    <Typography sx={{ color: "text.secondary", fontSize: 18 }}>
                      Rp {product.price.toLocaleString("id-ID")}
                    </Typography>
                    <Typography sx={{ color: "text.secondary", fontSize: 14 }}>
                      Rating: {product.averageRating || "Belum ada"}
                    </Typography>
                  </CardContent>
                </Card>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
  
}
