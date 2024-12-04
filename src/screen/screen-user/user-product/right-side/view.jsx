import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, Box, Grid, IconButton, TextField } from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import BigButton from '../../../../component/button-component/fulfill-button/view';
import OutlineButton from '../../../../component/button-component/outline-button/view';

export default function RightSideProduct({ product }) {
    const [quantity, setQuantity] = useState(0); // Default quantity 0
    const [subTotal, setSubTotal] = useState(0); // Subtotal awal 0

    // Mengupdate subtotal ketika quantity atau harga produk berubah
    useEffect(() => {
        if (product) {
            setSubTotal(quantity * product.price);
        }
    }, [quantity, product]);

    const handleDecrease = () => {
        if (quantity > 0) { // Tidak bisa kurang dari 0
            setQuantity(quantity - 1);
        }
    };

    const handleIncrease = () => {
        setQuantity(quantity + 1);
    };


    return (
        <Container maxWidth="sm" sx={{
            mt: 4, mb: 4,
            display: 'flex',
            flexDirection: 'column',
            height: "80vh",
        }}>
            <Typography variant="h5" gutterBottom>
                Order Details
            </Typography>
            <Box sx={{ mb: 2 }}>
                <Box display="flex" alignItems="center" justifyContent="space-between">
                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                        Quantity:
                    </Typography>

                    <Box display="flex" alignItems="center">
                        <IconButton
                            onClick={handleDecrease}
                            aria-label="decrease quantity"
                            sx={{ bgcolor: 'white', border: '1px solid #ccc', borderRadius: '4px', ml: 1 }}
                        >
                            <RemoveIcon />
                        </IconButton>
                        <Typography variant="body1" sx={{ mx: 1 }}>
                            {quantity}
                        </Typography>
                        <IconButton
                            onClick={handleIncrease}
                            aria-label="increase quantity"
                            sx={{ bgcolor: 'white', border: '1px solid #ccc', borderRadius: '4px', ml: 1 }}
                        >
                            <AddIcon />
                        </IconButton>
                    </Box>
                </Box>
            </Box>

            {/* Spacer untuk mendorong button ke bawah */}
            <Box sx={{ flexGrow: 1 }} />

            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                Sub Total: Rp. {subTotal.toLocaleString("id-ID")}
            </Typography>

            {/* Order Button Section */}
            <Box sx={{ marginTop: 2 }}>
                <BigButton />
            </Box>
            <Box sx={{ marginTop: 2 }}>
                <OutlineButton />
            </Box>
        </Container>
    );
}
