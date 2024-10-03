import React from 'react';
import { Box, Card, CardMedia, Grid, Paper, Button, Typography } from "@mui/material";
import { useParams } from "react-router-dom"; // Import useParams
import { dark, light } from "../../../../theme/color";
import ImageNotte from "../../../../../public/background.jpg";
import { primary } from '../../../../theme/color';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import StarIcon from '@mui/icons-material/Star';

// Sample data array for products
const menuData = [
    {
        id: 1,
        name: "Nasi Goreng",
        price: "Rp 50,000",
        rating: "4.5",
        image: ImageNotte,
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        detail: "Lorem ipsum dolor sit amet.",
    },
    {
        id: 2,
        name: "Menu 2",
        price: "Rp 75,000",
        rating: "4.2",
        image: ImageNotte,
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        detail: "Lorem ipsum dolor sit amet.",
    },
    {
        id: 3,
        name: "Menu 3",
        price: "Rp 100,000",
        rating: "4.8",
        image: ImageNotte,
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        detail: "Lorem ipsum dolor sit amet.",
    },
    {
        id: 4,
        name: "Menu 4",
        price: "Rp 60,000",
        rating: "4.3",
        image: ImageNotte,
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        detail: "Lorem ipsum dolor sit amet.",
    },
    {
        id: 5,
        name: "Menu 5",
        price: "Rp 40,000",
        rating: "4.1",
        image: ImageNotte,
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        detail: "Lorem ipsum dolor sit amet.",
    },
    {
        id: 6,
        name: "Menu 6",
        price: "Rp 30,000",
        rating: "4.7",
        image: ImageNotte,
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        detail: "Lorem ipsum dolor sit amet.",
    },
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

                            <Card sx={{ flex: 1, width: "100%" }}>
                                <CardMedia
                                    component="img"
                                    image={product.image} // Display product image
                                    alt={product.name}
                                    sx={{ height: 400 }}
                                />
                            </Card>
                            <Box
                                sx={{
                                    border: '1px solid #ccc',
                                    backgroundColor: 'rgba(255, 255, 255, 0.5)',
                                    padding: 3,
                                    marginTop: 10,
                                    borderRadius: '15px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <LocationOnIcon  sx={{ color: 'red', fontSize: '50px', marginRight: 2 }} /> {/* Red icon */}
                                <Typography variant="h6" sx={{  marginRight: 8 }}>
                                    Malang, INA
                                </Typography>
                                <Button
                                    variant="outlined" 
                                    sx={{
                                        marginRight: 2,
                                        backgroundColor: 'transparent', 
                                        borderColor: primary[100], 
                                        borderRadius: '15px', 
                                        padding: '8px 16px', 
                                        color: primary[100],
                                        '&:hover': {
                                            borderColor: primary[100],
                                            color: primary[100], 
                                        },
                                    }}
                                >
                                    view location
                                </Button>

                            </Box>
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
                            {/* button */}
                            <Button
                                variant="contained"
                                sx={{
                                    borderRadius: '20px',
                                    padding: '10px 20px',
                                    backgroundColor: primary[100],
                                    color: 'white',
                                    '&:hover': {
                                        backgroundColor: primary[200],
                                        opacity: 0.8,
                                    },
                                }}
                            >
                                Indonesian
                            </Button>

                            <h1>{product.name}</h1> {/* Display product name */}
                            <StarIcon sx={{ color: primary[100] }} />
                            <StarIcon sx={{ color: primary[100] }} />
                            <StarIcon sx={{ color: primary[100] }} />
                            <StarIcon sx={{ color: primary[100] }} />
                            <h3>Price: {product.price}</h3> {/* Display product price */}
                            <h3>Rating: {product.rating}</h3> {/* Display product rating */}

                            <Box sx={{ marginBottom: 2, }}>
                                <Typography>Deskripsi</Typography>
                                <Typography>{product.description}</Typography>
                            </Box>
                            <Box sx={{ marginBottom: 2, }}>
                                <Typography>Detail</Typography>
                                <Typography>{product.detail}</Typography>
                            </Box>

                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
}
