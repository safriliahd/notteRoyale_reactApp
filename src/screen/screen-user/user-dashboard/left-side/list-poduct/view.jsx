import React, { useEffect, useState } from "react";
import { Box, Card, CardMedia, CardContent, Grid, Paper, Typography, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { getProductsByCategory } from "../../../../../store/endpoint/endpoint-user/product/view"; // Import fungsi fetch API

export default function ListProductDashboard({ category, subCategory }) {
  const [products, setProducts] = useState([]); // State untuk menyimpan produk
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // State untuk menangani error

  const navigate = useNavigate();

  const handleCardClick = (id) => {
    navigate(`/product/${id}`); // Navigate ke halaman detail produk
  };

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true); // Set loading true sebelum fetch data
      try {
          console.log("Fetching products with:", { category, subCategory });
          const data = await getProductsByCategory(category, subCategory);
          console.log("Fetched data:", data);
          setProducts(data); // Simpan data produk
          setLoading(false); // Set loading false setelah data diterima
      } catch (error) {
          console.error("Error fetching products:", error.message);
          setError("Gagal memuat produk."); // Menangani error
          setLoading(false); // Set loading false jika error
      }
  };

    fetchProducts(); // Panggil fungsi fetch saat kategori atau subkategori berubah
  }, [category, subCategory]); // Dependency array, akan dipanggil setiap kategori atau subkategori berubah

  return (
    <Box sx={{ marginTop: 5, padding: 0 }}>
      {loading ? (
        <Box sx={{ textAlign: "center", marginTop: 5 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Box sx={{ textAlign: "center", marginTop: 5, color: "red" }}>
          <Typography variant="h6">{error}</Typography>
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
              key={product.id}
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
                onClick={() => handleCardClick(product.id)}
              >
                <Card sx={{ flex: 1, borderRadius: 5 }}>
                  <CardMedia
                    component="img"
                    image={product.photo || "/placeholder.jpg"} // Placeholder jika foto kosong
                    alt={product.name}
                    sx={{ height: 300 }}
                  />
                  <CardContent
                    sx={{ textAlign: "center", paddingBottom: 0 }}
                  >
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
                    <Typography
                      sx={{ color: "text.secondary", fontSize: 18 }}
                    >
                      Rp {product.price.toLocaleString("id-ID")}
                    </Typography>
                    <Typography
                      sx={{ color: "text.secondary", fontSize: 14 }}
                    >
                      Rating: {product.rating}
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
