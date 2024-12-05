import React, { useState, useEffect } from 'react';
import {
    Container,
    Typography,
    Box,
    Grid,
    TextField,
    MenuItem,
    Avatar,
    Divider,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
} from '@mui/material';
import { dark, light, primary } from '../../../../theme/color';
import BigButton from '../../../../component/button-component/fulfill-button/view';
import { getCartList } from '../../../../store/endpoint/endpoint-user/cart/getCartList/view';
import { getOrderNumber } from '../../../../store/endpoint/endpoint-user/order/view';
import { getAvailableTables } from '../../../../store/endpoint/endpoint-user/table/view';
import { createOrder } from '../../../../store/endpoint/endpoint-user/order/view';
import { clearCart } from '../../../../store/endpoint/endpoint-user/cart/clearCart/view';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteCartItem } from '../../../../store/endpoint/endpoint-user/cart/deleteCart/view';

export default function RightSideDashboard() {
    const [cartProducts, setCartProducts] = useState([]);
    const [orderNumber, setOrderNumber] = useState(null);
    const [orderMessage, setOrderMessage] = useState('');
    const [tables, setTables] = useState([]);
    const [selectedTable, setSelectedTable] = useState('');
    const [selectedTableId, setSelectedTableId] = useState(null);

    // State untuk modal
    const [openConfirmModal, setOpenConfirmModal] = useState(false);
    const [openSuccessModal, setOpenSuccessModal] = useState(false);

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
                    setSelectedTableId(data[0]._id);
                }
            })
            .catch((error) => {
                console.error('Error fetching available tables:', error);
                setTables([]);
            });

        getCartList()
            .then((data) => {
                console.log('Cart Products:', data);
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
            setSelectedTableId(table._id);
        }
    };

    const handleOrderNow = () => {
        setOpenConfirmModal(true);
    };

    const handleConfirmOrder = () => {
        const orderData = {
            tableId: selectedTableId,
            items: cartProducts
                .filter((product) => product.productId)
                .map((product) => ({
                    product: product.productId,
                    quantity: product.quantity,
                })),
        };

        if (orderData.items.length === 0) {
            console.error('No valid products to order');
            return;
        }

        createOrder(orderData)
            .then((data) => {
                console.log('Order created successfully:', data);
                clearCart(setCartProducts); // Kosongkan cart setelah pesanan berhasil
                setOpenConfirmModal(false);
                setOpenSuccessModal(true);
            })
            .catch((error) => {
                console.error('Error creating order:', error.message);
            });
    };

    const handleDeleteItem = async (productId) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this product from the cart?');
        if (confirmDelete) {
            console.log('Deleting product with ID:', productId); // Log ID for debugging
            try {
                await deleteCartItem(productId);
                setCartProducts((prev) => prev.filter((product) => product.productId !== productId));
                console.log('Item deleted successfully');
            } catch (error) {
                console.error('Failed to delete item:', error.message);
            }
        } else {
            console.log('Item deletion canceled');
        }
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 4, mb: 4, display: 'flex', flexDirection: 'column', height: '100%' }}>
            {/* Header */}
            <Grid container alignItems="center" spacing={2} sx={{ mb: 0 }}>
                <Grid item xs={8}>
                    <Typography sx={{ fontWeight: 'bold', fontSize: 24, color: dark[300] }}>Current Order</Typography>
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
                            Table Code O: Regular Outdoor
                        </Typography>
                    </Grid>
                </Grid>
            </Box>

            {/* Cart Products */}
            <Box sx={{ maxHeight: '300px', overflowY: 'auto', mb: 0 }}>
                {cartProducts.length > 0 ? (
                    cartProducts.map((product, index) => (
                        <Box key={product.productId}>
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
                                <DeleteIcon
                                    sx={{
                                        cursor: 'pointer',
                                        color: 'error.dark',
                                        '&:hover': { color: 'error.light' },
                                    }}
                                    onClick={() => handleDeleteItem(product.productId)}
                                />
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

            {/* Subtotal */}
            <Box sx={{ mb: 0 }}>
                <Typography sx={{ fontWeight: 'bold', textAlign: 'right', fontSize: 20 }}>
                    Subtotal: Rp {calculateSubtotal().toLocaleString('id-ID')}
                </Typography>
            </Box>

            <Divider sx={{ my: 2 }} />

            {/* BigButton */}
            <Box>
                <BigButton onClick={handleOrderNow} />
            </Box>

            {/* Modal Konfirmasi */}
            <Dialog open={openConfirmModal} onClose={() => setOpenConfirmModal(false)}>
                <DialogTitle sx={{ color: primary[100], textAlign: 'center', fontWeight: 'bold', mt: 3, fontSize: 28 }}>
                    Confirm
                </DialogTitle>
                <DialogContent>
                    <Typography sx={{ textAlign: 'center', color: dark[500] }}>
                        Are you sure you want to place this order?
                    </Typography>
                </DialogContent>
                <DialogActions sx={{ justifyContent: 'center', mb: 3 }}>
                    <Button
                        variant="contained"
                        color="warning"
                        onClick={handleConfirmOrder}
                        sx={{
                             textTransform: 'none', px: 3, backgroundColor: primary[100], 
                             boxShadow: "none",
                             borderRadius: 25,
                             "&:hover": {
                               backgroundColor: primary[200], 
                               boxShadow: "none",
                               color: light[200],
                             },
                        }}
                    >
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Modal Sukses */}
            <Dialog open={openSuccessModal} onClose={() => setOpenSuccessModal(false)}>
                <DialogTitle sx={{ color: 'success.main', textAlign: 'center', fontWeight: 'bold',  mt: 3, fontSize: 28 }}>
                    Successful
                </DialogTitle>
                <DialogContent>
                    <Typography sx={{ textAlign: 'center', color: dark[500] }}>
                        Your order has been successfully placed!
                    </Typography>
                </DialogContent>
                <DialogActions sx={{ justifyContent: 'center' }}>
                    <Button
                        variant="contained"
                        color="success"
                        onClick={() => setOpenSuccessModal(false)}
                        sx={{
                             textTransform: 'none',
                              px: 3 ,
                              borderRadius: 25,
                              mb: 3

                        }}
                    >
                        Done
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
}
