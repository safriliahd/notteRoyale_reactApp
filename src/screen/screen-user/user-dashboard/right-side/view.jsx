import React, { useState } from 'react';
import { Container, Typography, Box, Grid, TextField, MenuItem, Avatar, Divider } from '@mui/material';
import { dark, light } from '../../../../theme/color';
import BigButton from '../../../../component/button-component/fulfill-button/view';

export default function RightSideDashboard() {
    const currencies = [
        { value: 'vvip', label: 'A1' },
        { value: 'vip', label: 'B1' },
        { value: 'reguler', label: 'C1' },
        { value: 'outdoor', label: 'D1' },
    ];

    // State untuk daftar produk dalam cart
    const [cartProducts, setCartProducts] = useState([
        {
            id: 1,
            name: 'Product 1',
            price: 10000,
            quantity: 2,
            image: '/product1.jpg', // URL gambar produk
        },
        {
            id: 2,
            name: 'Product 2',
            price: 15000,
            quantity: 1,
            image: '/product2.jpg',
        },
        {
            id: 3,
            name: 'Product 3',
            price: 25000,
            quantity: 1,
            image: '/product2.jpg',
        },
        {
            id: 4,
            name: 'Product 4',
            price: 39000,
            quantity: 1,
            image: '/product2.jpg',
        },
    ]);

    return (
        <Container
            maxWidth="sm"
            sx={{
                mt: 4,
                mb: 4,
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
            }}
        >
            {/* Header */}
            <Grid container alignItems="center" spacing={2} sx={{ mb: 0 }}>
                <Grid item xs={8}>
                    <Typography
                        variant="body1"
                        sx={{
                            fontWeight: 'bold',
                            fontSize: 24,
                            color: dark[400],
                        }}
                    >
                        Current Order
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 'bold', fontSize: 16 }}>
                        #00001
                    </Typography>
                </Grid>

                <Grid item xs={4}>
                    <TextField
                        id="standard-select-currency"
                        select
                        label="Table"
                        defaultValue="vvip"
                        variant="standard"
                        fullWidth
                    >
                        {currencies.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
            </Grid>

            {/* Table Notes */}
            <Box sx={{ mb: 2, backgroundColor: light[100], padding: 2, borderRadius: '8px' }}>
                <Grid container spacing={2}>
                    {/* Kode A & B (Kiri) */}
                    <Grid item xs={5}>
                        <Typography variant="body2" sx={{ fontWeight: 'bold', color: dark[500] }}>
                            Table Code A: VVIP
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 'bold', color: dark[500], marginTop: 1 }}>
                            Table Code B: VIP
                        </Typography>
                    </Grid>

                    {/* Kode C & D (Kanan) */}
                    <Grid item xs={7}>
                        <Typography variant="body2" sx={{ color: dark[500] }}>
                            Table Code C: Regular Indoor
                        </Typography>
                        <Typography variant="body2" sx={{ color: dark[500], marginTop: 1 }}>
                            Table Code D: Regular Outdoor
                        </Typography>
                    </Grid>
                </Grid>
            </Box>


            {/* List Products */}
            <Box
                sx={{
                    maxHeight: '300px',
                    overflowY: 'auto',
                    mb: 0,
                }}
            >
                {cartProducts.map((product, index) => (
                    <Box key={product.id}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            {/* Product Image */}
                            <Avatar
                                src={product.image}
                                alt={product.name}
                                sx={{
                                    width: 50,
                                    height: 50,
                                    mr: 2,
                                    borderRadius: '4px', // Making the corners slightly rounded
                                    border: `1px solid ${light[400]}`,
                                }}
                            />

                            {/* Product Information */}
                            <Box sx={{ flex: 1 }}>
                                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                                    {product.name}
                                </Typography>
                                <Typography variant="body2" sx={{ color: dark[400] }}>
                                    Rp {product.price.toLocaleString('id-ID')}
                                </Typography>
                                <Typography variant="body2" sx={{ color: dark[300] }}>
                                    Qty: {product.quantity}
                                </Typography>
                            </Box>
                        </Box>

                        {/* Divider */}
                        {index < cartProducts.length - 1 && <Divider sx={{ my: 1 }} />} {/* Adding margin to Divider */}
                    </Box>
                ))}
            </Box>

            <Box sx={{ flexGrow: 1 }} />

            <Divider sx={{ my: 2 }} />

            {/* BigButton */}
            <Box>
                <BigButton />
            </Box>
        </Container>
    );
}
