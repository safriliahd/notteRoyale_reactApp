import React, { useState } from "react";
import {
    Box,
    Tabs,
    Tab,
    List,
    ListItem,
    ListItemText,
    Typography,
    Collapse,
    IconButton,
    Divider,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { dark, primary } from "../../../theme/color";

export default function OrderUser() {
    const [selectedTab, setSelectedTab] = useState(0);

    // Contoh data
    const onProcessOrders = [
        {
            orderNo: "001",
            tableNo: "A1",
            totalPrice: 150000,
            orderTime: "10:30 AM",
            details: [
                { name: "Nasi Goreng", quantity: 2, price: 40000 },
                { name: "Teh Manis", quantity: 2, price: 35000 },
            ],
        },
        {
            orderNo: "002",
            tableNo: "B2",
            totalPrice: 120000,
            orderTime: "11:00 AM",
            details: [
                { name: "Mie Ayam", quantity: 1, price: 20000 },
                { name: "Es Jeruk", quantity: 1, price: 10000 },
            ],
        },
    ];

    const completedOrders = [
        {
            orderNo: "003",
            tableNo: "C3",
            totalPrice: 200000,
            orderTime: "1:30 PM",
            details: [
                { name: "Pizza", quantity: 1, price: 150000 },
                { name: "Coca Cola", quantity: 2, price: 50000 },
            ],
        },
    ];

    const handleChangeTab = (event, newValue) => {
        setSelectedTab(newValue);
    };

    return (
        <Box sx={{ maxWidth: 600, mx: "auto", mt: 4 }}>
            <Typography align="center" gutterBottom sx={{
                fontSize: 32,
                fontWeight: 'bold',
                color: dark[300],
                mb: 3
            }}>
                My Orders
            </Typography>

            {/* Tabs untuk kategori */}
            <Tabs
                value={selectedTab}
                onChange={handleChangeTab}
                centered
                TabIndicatorProps={{ style: { backgroundColor: primary[100] } }}
                sx={{
                    "& .MuiTab-root": {
                        textTransform: "none",
                        fontSize: 22,
                        fontWeight: 600,
                        color: "#888",  // default color for inactive tabs
                    },
                    "& .Mui-selected": {
                        color: dark[300],  // color when the tab is selected
                    },
                }}
            >
                <Tab
                    label="On-Process"
                />
                <Tab
                    label="Completed"
                />
            </Tabs>


            {/* Konten berdasarkan kategori */}
            <Box sx={{ mt: 2 }}>
                {selectedTab === 0 && <OrderList orders={onProcessOrders} />}
                {selectedTab === 1 && <OrderList orders={completedOrders} />}
            </Box>
        </Box>
    );
}

// Komponen untuk menampilkan daftar order
function OrderList({ orders }) {
    const [expanded, setExpanded] = useState(null);

    const handleToggle = (index) => {
        setExpanded(expanded === index ? null : index);
    };

    return (
        <List>
            {orders.map((order, index) => (
                <Box
                    key={index}
                    sx={{
                        mb: 2,
                        borderRadius: 2,
                        padding: 2,
                        backgroundColor: "#fff",
                        boxShadow: 3, // Bayangan kotak
                        transition: "all 0.3s ease",
                        ":hover": {
                            boxShadow: 6, // Bayangan lebih besar saat hover
                        },
                    }}
                >
                    <ListItem
                        button
                        onClick={() => handleToggle(index)}
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            padding: 0,
                        }}
                    >
                        {/* Sebelah kiri: No Order & No Tabel */}
                        <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
                            <Typography
                                variant="subtitle1"
                                sx={{
                                    fontWeight: "bold",
                                    fontSize: "1rem",
                                }}
                            >
                                Order No: {order.orderNo}
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{
                                    color: "#888",
                                    fontSize: "0.85rem",
                                    marginTop: "2px",
                                }}
                            >
                                Table: {order.tableNo}
                            </Typography>
                        </Box>

                        {/* Sebelah kanan: Time & Price */}
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flex-end",
                                flex: 1,
                                marginRight: 2,
                            }}
                        >
                            <Typography
                                variant="body2"
                                sx={{
                                    color: "#888",
                                    fontSize: "0.85rem",
                                    marginBottom: "4px",
                                }}
                            >
                                {order.orderTime}
                            </Typography>
                            <Typography
                                variant="subtitle1"
                                sx={{
                                    fontWeight: "bold",
                                    fontSize: "1rem",
                                }}
                            >
                                Rp {order.totalPrice.toLocaleString()}
                            </Typography>
                        </Box>

                        {/* Icon expand */}
                        <IconButton>
                            {expanded === index ? <ExpandLess /> : <ExpandMore />}
                        </IconButton>
                    </ListItem>

                    {/* Detail Order */}
                    <Collapse in={expanded === index} timeout="auto" unmountOnExit>
                        <Box sx={{ pl: 4, pb: 2 }}>
                            {order.details.map((detail, idx) => (
                                <Box
                                    key={idx}
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        py: 0.5,
                                        borderBottom: idx < order.details.length - 1 ? "1px solid #f0f0f0" : "none",
                                    }}
                                >
                                    {/* Nama makanan */}
                                    <Typography variant="body2" sx={{ flex: 2 }}>
                                        {detail.name}
                                    </Typography>

                                    {/* Quantity */}
                                    <Typography
                                        variant="body2"
                                        sx={{ flex: 1, textAlign: "center" }}
                                    >
                                        x{detail.quantity}
                                    </Typography>

                                    {/* Harga */}
                                    <Typography
                                        variant="body2"
                                        sx={{ flex: 1, textAlign: "right" }}
                                    >
                                        Rp {detail.price.toLocaleString()}
                                    </Typography>
                                </Box>
                            ))}
                        </Box>
                    </Collapse>
                </Box>
            ))}
        </List>
    );
}
