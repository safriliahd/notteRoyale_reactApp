import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Grid, TextField, MenuItem, Avatar, Divider } from '@mui/material';
import { dark, light } from '../../../../theme/color';
import BigButton from '../../../../component/button-component/fulfill-button/view';
import { getCartList } from '../../../../store/endpoint/endpoint-user/cart/getCartList/view';
import { getOrderNumber } from '../../../../store/endpoint/endpoint-user/order/view';
import { getAvailableTables } from '../../../../store/endpoint/endpoint-user/table/view';
import { createOrder } from '../../../../store/endpoint/endpoint-user/order/view';
import { clearCart } from '../../../../store/endpoint/endpoint-user/cart/clearCart/view';


export default function RightSideDashboard() {
    const [cartProducts, setCartProducts] = useState([]);
    const [orderNumber, setOrderNumber] = useState(null);
    const [orderMessage, setOrderMessage] = useState('');
    const [tables, setTables] = useState([]);
    const [selectedTable, setSelectedTable] = useState('');
    const [selectedTableId, setSelectedTableId] = useState(null);

    // Fetch data on component mount
    useEffect(() => {
        getOrderNumber()
            .then((data) => {
                setOrderNumber(data.orderNumber || 'Loading...');
                setOrderMessage(data.message || 'No message');
            })
            .catch((error) => {
                console.error('Error fetching order number:', error);
                setOrderNumber('Error');
                setOrderMessage('Error fetching message');
            });

        getAvailableTables()
            .then((data) => {
                setTables(data);
                if (data.length > 0) {
                    setSelectedTable(data[0].tableNumber);
                    setSelectedTableId(data[0]._id); // Menyimpan ID meja
                }
            })
            .catch((error) => {
                console.error('Error fetching available tables:', error);
                setTables([]);
            });

            getCartList()
            .then((data) => {
                console.log('Cart Products:', data); // Cek data yang diterima
                setCartProducts(data.cartItems || []);
            })
            .catch((error) => {
                console.error('Error fetching cart list:', error);
                setCartProducts([]);
            });
    }, []);

    const calculateSubtotal = () => {
        return cartProducts.reduce((total, product) => total + product.price * product.quantity, 0);
    };

    const handleTableChange = (event) => {
        const selectedTableNumber = event.target.value;
        setSelectedTable(selectedTableNumber);

        const table = tables.find((t) => t.tableNumber === selectedTableNumber);
        if (table) {
            setSelectedTableId(table._id); // Simpan ID meja
        }
    };

    const handleOrderNow = () => {
        const orderData = {
          tableId: selectedTableId, // Pastikan menggunakan ID meja yang valid
          items: cartProducts
            .filter((item) => item.productId) // Memastikan produk memiliki productId
            .map((item) => ({
              product: item.productId, // Menggunakan productId dari cartItems
              quantity: item.quantity,   // Kuantitas tetap
            })),
        };
      
        if (orderData.items.length === 0) {
          console.error('No valid products to order');
          return; // Jangan lanjutkan jika tidak ada produk yang valid
        }
      
        createOrder(orderData)
          .then((data) => {
            console.log('Order created successfully:', data);
            clearCart(setCartProducts); // Kosongkan cart setelah pesanan berhasil
          })
          .catch((error) => {
            console.error('Error creating order:', error.message);
          });
      };
      
    
    
    
    
    
    

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
                        #{orderMessage}
                    </Typography>
                </Grid>

                <Grid item xs={4}>
                    <TextField
                        id="standard-select-currency"
                        select
                        label="Table"
                        value={selectedTable}
                        onChange={handleTableChange}
                        variant="standard"
                        fullWidth
                    >
                        {tables.length > 0 ? (
                            tables.map((option) => (
                                <MenuItem key={option._id} value={option.tableNumber}>
                                    {option.tableNumber}
                                </MenuItem>
                            ))
                        ) : (
                            <MenuItem disabled>No tables available</MenuItem>
                        )}
                    </TextField>
                </Grid>
            </Grid>

            {/* Table Notes */}
            <Box sx={{ mb: 2, backgroundColor: light[100], padding: 2, borderRadius: '8px' }}>
                <Grid container spacing={2}>
                    <Grid item xs={5}>
                        <Typography variant="body2" sx={{ fontWeight: 'bold', color: dark[500] }}>
                            Table Code A: VVIP
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 'bold', color: dark[500], marginTop: 1 }}>
                            Table Code B: VIP
                        </Typography>
                    </Grid>
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
            <Box sx={{ maxHeight: '300px', overflowY: 'auto', mb: 0 }}>
                {cartProducts.length > 0 ? (
                    cartProducts.map((product, index) => (
                        <Box key={product.id}>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <Avatar
                                    src={product.image}
                                    alt={product.name}
                                    sx={{
                                        width: 50,
                                        height: 50,
                                        mr: 2,
                                        borderRadius: '4px',
                                        border: `1px solid ${light[400]}`,
                                    }}
                                />

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
                            {index < cartProducts.length - 1 && <Divider sx={{ my: 1 }} />}
                        </Box>
                    ))
                ) : (
                    <Typography variant="body2" sx={{ color: dark[500] }}>
                        No products in your cart
                    </Typography>
                )}
            </Box>

            <Box sx={{ flexGrow: 1 }} />

            <Divider sx={{ my: 2 }} />

            {/* Subtotal */}
            <Box sx={{ mb: 2 }}>
                <Typography variant="body1" sx={{ fontWeight: 'bold', textAlign: 'right' }}>
                    Subtotal: Rp {calculateSubtotal().toLocaleString('id-ID')}
                </Typography>
            </Box>

            {/* BigButton */}
            <Box>
                <BigButton onClick={handleOrderNow} />
            </Box>
        </Container>
    );
}
