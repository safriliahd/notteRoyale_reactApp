import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { Box, Card, CardMedia, Grid, Paper, Button, Typography } from "@mui/material";
import { primary } from '../../../../theme/color';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import StarIcon from '@mui/icons-material/Star';
import { getProductById } from '../../../../store/endpoint/endpoint-user/product/view';

export default function LeftSideProductDetail() {
    const { id } = useParams(); // Mendapatkan ID dari URL
    const [product, setProduct] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const productData = await getProductById(id);
                setProduct({ ...productData, averageRating: productData.averageRating || 0 }); // Tambahkan fallback untuk averageRating
            } catch (err) {
                setError(err.message);
            }
        };

        fetchProduct();
    }, [id]);

    if (error) {
        return <Typography variant="h6" color="error">{error}</Typography>;
    }

    if (!product) {
        return <Typography variant="h6">Loading...</Typography>;
    }

    // Validasi averageRating
    const averageRating = Math.max(0, Math.round(product.averageRating || 0));

    return (
        <Box sx={{ marginTop: 5, padding: 0 }}>
            <Grid container spacing={3} columns={{ xs: 4, sm: 8, md: 12 }} sx={{ paddingLeft: 0 }}>
                <Grid item xs={4} sm={8} md={6} sx={{ mb: { xs: 5, sm: 0 } }}>
                    <Paper sx={{ height: "100%", paddingTop: 0, boxShadow: "none" }}>
                        <Card sx={{ flex: 1, width: "100%" }}>
                            <CardMedia
                                component="img"
                                image={product.photo || "default.jpg"} // Fallback untuk gambar
                                alt={product.name}
                                sx={{ height: 400 }}
                            />
                        </Card>
                        <Box sx={{
                            border: '1px solid #ccc',
                            backgroundColor: 'rgba(255, 255, 255, 0.5)',
                            padding: 3,
                            marginTop: 10,
                            borderRadius: '15px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <LocationOnIcon sx={{ color: 'red', fontSize: '50px', marginRight: 2 }} />
                            <Typography variant="h6" sx={{ marginRight: 8 }}>Malang, INA</Typography>
                            <Button
                                variant="outlined"
                                sx={{
                                    borderColor: primary[100],
                                    color: primary[100],
                                    borderRadius: '15px',
                                    padding: '8px 16px'
                                }}
                            >
                                View Location
                            </Button>
                        </Box>
                    </Paper>
                </Grid>
                <Grid item xs={4} sm={8} md={6} sx={{ mb: { xs: 2, sm: 0 } }}>
                    <Paper sx={{ paddingTop: 0, boxShadow: "none" }}>
                        <Box sx={{ paddingInlineStart: 2, paddingInlineEnd: 2 }}>
                            <h1>{product.name}</h1>
                            {[...Array(averageRating)].map((_, i) => (
                                <StarIcon key={i} sx={{ color: primary[100] }} />
                            ))}
                            <h3>Price: Rp {product.price}</h3>
                            <h3>Category: {product.category}</h3>
                            <Box sx={{ marginBottom: 2 }}>
                                <Typography>Description</Typography>
                                <Typography>{product.description}</Typography>
                            </Box>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
}
