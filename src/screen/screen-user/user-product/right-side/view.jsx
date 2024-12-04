import React, { useState, useEffect } from "react";
import { Container, Typography, Box, IconButton } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import BigButton from "../../../../component/button-component/fulfill-button/view";
import OutlineButton from "../../../../component/button-component/outline-button/view";
import { useNavigate } from "react-router-dom"; // Import for navigation
import { createOrder } from "../../../../store/endpoint/endpoint-user/order/view"; // Pastikan pathnya sesuai
import { addToCart } from "../../../../store/endpoint/endpoint-user/cart/addToCart/view"; // Pastikan pathnya sesuai

export default function RightSideProduct({ product }) {
    const [quantity, setQuantity] = useState(0); // Default quantity 0
    const [subTotal, setSubTotal] = useState(0); // Subtotal awal 0
    const navigate = useNavigate();

    useEffect(() => {
        console.log("Received product in RightSideProduct:", product);
        if (product) {
            setSubTotal(quantity * product.price);
        }
    }, [quantity, product]);


    const handleAddToCart = async () => {
        try {
            if (!product) {
                alert("Produk tidak ditemukan");
                return;
            }
    
            if (quantity === 0) {
                alert("Jumlah produk tidak boleh 0");
                return;
            }
    
            const cartData = {
                product: product.productId, // pastikan product sudah ada dan memiliki _id
                quantity,
            };
    
            const response = await addToCart(cartData);
            alert("Produk berhasil ditambahkan ke keranjang!");
            navigate('/user-dashboard'); // Kembali ke halaman sebelumnya
        } catch (error) {
            console.error("Add to cart error:", error.response || error.message);
            alert("Gagal menambah produk ke keranjang");
        }
    };
    
    

    
    const handleDecrease = () => {
        if (quantity > 0) {
            setQuantity(quantity - 1);
        }
    };

    const handleIncrease = () => {
        setQuantity(quantity + 1);
    };

    if (!product) {
        return (
            <Typography variant="h6" color="textSecondary">
                Loading product details...
            </Typography>
        );
    }

    return (
        <Container maxWidth="sm" sx={{ mt: 4, mb: 4, display: "flex", flexDirection: "column", height: "80vh" }}>
            <Typography variant="h5" gutterBottom>
                Order Details
            </Typography>
            <Box sx={{ mb: 2 }}>
                <Box display="flex" alignItems="center" justifyContent="space-between">
                    <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                        Quantity:
                    </Typography>

                    <Box display="flex" alignItems="center">
                        <IconButton onClick={handleDecrease} aria-label="decrease quantity">
                            <RemoveIcon />
                        </IconButton>
                        <Typography variant="body1" sx={{ mx: 1 }}>
                            {quantity}
                        </Typography>
                        <IconButton onClick={handleIncrease} aria-label="increase quantity">
                            <AddIcon />
                        </IconButton>
                    </Box>
                </Box>
            </Box>

            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                Sub Total: Rp. {subTotal.toLocaleString("id-ID")}
            </Typography>


            <Box sx={{ marginTop: 2 }}>
                <OutlineButton onClick={handleAddToCart}/>
            </Box>
        </Container>
    );
}

  
